export const RegisterFormControls =[
    {
        name: 'userName',
        label: 'User name',
        placeholder: 'Enter your username',
        type: 'text',
        componentType: 'input'
    },

    {
        name: 'userEmail',
        label: 'User Email',
        placeholder: 'Enter your email',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        componentType: 'input'
    },
]

export const LoginFormControls =[

    {
        name: 'userEmail',
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        componentType: 'input'
    },
]

export const initialRegisterFormData = {
    userName: "",
    userEmail: "",
    password: ""
}

export const initialLoginFormData ={
    userEmail: "",
    password: ""
}

export const CourseLandingInitialFormData = {
    courseName: "",
    level: "",
    Category: "",
    primarylanguage: "",
    subTitle: "",
    description: "",
    pricing: "",
    objectives: "",
    welcomemessage: "",
    image: ""
}


export const languageOptions = [
    {id: "english", label: "English"},
    {id: "afrikaans", label: "Afrikaans"}
]

export const courseLevelOptions = [
    { id: "first-year", label: "First Year" },
    { id: "second-year", label: "Second Year" },
    { id: "third-year", label: "Third Year" }
];

export const courseCategories = [
    { id: "accounting", label: "Accounting" },
    { id: "mathematics", label: "Mathematics" },
    { id: "business", label: "Business" },
    { id: "law", label: "Law" },
    { id: "computer-science", label: "Computer Science" },
    { id: "economics", label: "Economics" },
    { id: "finance", label: "Finance" },
    { id: "management", label: "Management" },
    { id: "human-resources", label: "Human Resources" },
    { id: "psychology", label: "Psychology" },
    { id: "marketing", label: "Marketing" },
    { id: "research", label: "Research" },
    { id: "taxation", label: "Taxation" }
];

export const courseCourseLandingPageFormControls = [
    {
        name: 'courseName',
        label: 'Course Name',
        placeholder: 'Enter course name',
        type: 'text',
        componentType: 'input'
    },
    {
        name: 'level',
        label: 'Level',
        placeholder: 'Select course level',
        type: 'text',
        componentType: 'select',
        options: courseLevelOptions
    },
    {
        name: 'Category',
        label: 'Category',
        placeholder: 'Select course category',
        type: 'text',
        componentType: 'select',
        options: courseCategories
    },
    {
        name: 'primarylanguage',
        label: 'Primary Language',
        placeholder: 'Select course language',
        type: 'text',
        componentType: 'select',
        options: languageOptions
    },
    {
        name: 'subTitle',
        label: 'SubTitle',
        placeholder: 'Enter course subtitle',
        type: 'text',
        componentType: 'input'

    },
    {
        name: 'description',
        label: 'Course Description',
        placeholder: 'Enter course description',
        type: 'text',
        componentType: 'textarea'
    },
    {
        name: 'pricing',
        label: 'Pricing',
        placeholder: 'Enter course pricing',
        type: 'number',
        componentType: 'input'
    },
    {
        name: 'objectives',
        label: 'Objectives',
        placeholder: 'Enter course objectives',
        type: 'text',
        componentType: 'input'
    },
    {
        name: 'welcomemessage',
        label: 'Welcome Message',
        placeholder: 'Enter welcome message',
        componentType: 'textarea'
    },
]

export const courseCurriculumInitialFormData= [
    {
        title: '',
        videoUrl: '',
        freePreview: false,
        public_id: ''
    }
]

export const courseCurriculumFormControls = [
    {
        name: 'title',
        label: 'Title',
        placeholder: 'Enter video title',
        type: 'text',
        componentType: 'input'
    },
    {
        name: 'videoUrl',
        label: 'Video URL',
        placeholder: 'Enter video URL',
        type: 'text',
        componentType: 'input'
    },
    {
        name: 'freePreview',
        label: 'Free Preview',
        type: 'checkbox',
        componentType: 'input'
    }
]

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const filterOptions = {
    category: courseCategories,
    level: courseLevelOptions,
  };