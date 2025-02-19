import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge"
import { Banknote, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { searchUsersService, searchCoursesService, getAllUsersService } from "@/services";
import { Button } from "@/components/ui/button";
import { Shield, Trash2, ShieldCheck } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {promoteUserService, demoteUserService ,deleteUserService} from "@/services"


function AdminDashboard({coursesList}) {
    const [usersList, setUsersList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userType, setUserType] = useState('all');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchQuery, userType, usersList]);

    async function fetchUsers() {
        try {
            const response = await getAllUsersService();
            if (response.success) {
                setUsersList(response.data);
                setFilteredUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    function filterUsers() {
        let filtered = usersList;

        // Filter by user type
        if (userType !== 'all') {
            filtered = filtered.filter(user => user.role === userType);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(user => 
                user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredUsers(filtered);
    }

    const stats = {
        totalStudents: usersList.filter(user => user.role === 'user').length,
        totalAdmins: usersList.filter(user => user.role === 'admin').length,
        totalRevenue: calculateTotalRevenue(coursesList)
    };



    async function handleDeleteUser(userId) {
        try {
            const response = await deleteUserService(userId);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "User deleted successfully",
                });
                fetchUsers(); // Refresh user list
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to delete user",
                variant: "destructive",
            });
        }
    }

    async function handlePromoteUser(userId) {
      console.log('Attempting to promote user:', userId);
      try {
          const response = await promoteUserService(userId);
          console.log('Promotion response:', response);
          
          if (response.success) {
              toast({
                  title: "Success",
                  description: "User promoted to admin successfully",
              });
              await fetchUsers(); // Refresh user list
          } else {
              throw new Error(response.message || 'Failed to promote user');
          }
      } catch (error) {
          console.error('Promote user error:', error); // Add error logging
          toast({
              title: "Error",
              description: error.response?.data?.message || "Failed to promote user",
              variant: "destructive",
          });
      }
  }

  async function handleDemoteUser(userId) {
    try {
        const response = await demoteUserService(userId);
        if (response.success) {
            toast({
                title: "Success",
                description: "User demoted successfully",
            });
            await fetchUsers(); // Refresh user list
        }
    } catch (error) {
        toast({
            title: "Error",
            description: error.response?.data?.message || "Failed to demote user",
            variant: "destructive",
        });
    }
}

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalStudents}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Tutors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalAdmins}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R{stats.totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <div className="flex items-center space-x-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select 
                            className="border p-2 rounded"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="all">All Users</option>
                            <option value="user">Students</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user, index) => (
                                    <TableRow key={user._id || index}>
                                        <TableCell>{user.userName}</TableCell>
                                        <TableCell>{user.userEmail}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.isVerified ? 'success' : 'destructive'}>
                                                {user.isVerified ? 'Verified' : 'Unverified'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {user.role !== 'admin' ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handlePromoteUser(user._id)}
                                                    >
                                                        <Shield className="h-4 w-4" />
                                                    </Button>
                                                ):(
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDemoteUser(user._id)}
                                                    >
                                                        <ShieldCheck className="h-4 w-4 " />
                                                    </Button>
                                                )
                                                }
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setShowDeleteDialog(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete {selectedUser?.userName}'s account.
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => {
                            handleDeleteUser(selectedUser?._id);
                            setShowDeleteDialog(false);
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
    );
}

function calculateTotalRevenue(coursesList) {
    return coursesList.reduce((total, course) => {
        return total + (course.pricing * (course.students?.length || 0));
    }, 0);
}

export default AdminDashboard;