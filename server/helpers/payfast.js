const crypto = require("crypto");

// const generateSignature = (data, passPhrase = null) => {
//     // PayFast requires fields in specific order, not alphabetically sorted
//     const orderedFields = [
//         'merchant_id',
//         'merchant_key',
//         'return_url',
//         'cancel_url',
//         'notify_url',
//         'name_first',
//         'name_last',
//         'email_address',
//         'amount',
//         'item_name',
//         'custom_str1'
//     ];


//     // Build parameter string in correct order
//     let paramString = orderedFields
//         .filter(key => data[key] !== undefined && data[key] !== '') // Filter out undefined or empty values
//         .map(key => {
//             const value = String(data[key]);
//             // PayFast requires uppercase URL encoding and + for spaces
//             return `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`;
//         })
//         .join('&');

//     // Add passphrase if provided
//     if (passPhrase) {
//         paramString += `&passphrase=${encodeURIComponent(passPhrase)}`;
//     }

    

//     // Generate MD5 hash of the parameter string
//     const signature = crypto.createHash('MD5').update(paramString).digest('hex');

//     return signature;
// };


const generateSignature = (data, passPhrase = null) => {
    // Remove signature if exists
    let pfData = {...data};
    delete pfData.signature;
    
    // Create parameter string
    let pfParamString = Object.keys(pfData)
        .filter(key => pfData[key] !== undefined && pfData[key] !== '')
        .map(key => {
            const value = String(pfData[key]);
            return `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`;
        })
        .join('&');

    // Add passphrase if provided
    if (passPhrase !== null && passPhrase !== '') {
        pfParamString += `&passphrase=${encodeURIComponent(passPhrase)}`;
    }

    // Generate MD5 hash
    return crypto.createHash('MD5').update(pfParamString).digest('hex');
};

const ITN_Signature = (data, passPhrase = null) => {
    // Make a copy and remove the received signature
    const pfData = { ...data };
    delete pfData.signature;
    
    // Create parameter string, excluding empty values
    let pfParamString = Object.keys(pfData)
        .filter(key => {
            const value = pfData[key];
            return value !== undefined && value !== '' && value !== null;
        })
        .sort()
        .map(key => {
            const value = String(pfData[key]);
            console.log(`${key}: ${value}`);
            
            return `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`;
        })
        .join('&');

    // Add passphrase if provided
    if (passPhrase !== null && passPhrase !== '') {
        pfParamString += `&passphrase=${encodeURIComponent(passPhrase)}`;
    }

    return crypto.createHash('md5').update(pfParamString).digest('hex');
};

const pfValidSignature = (pfData, pfParamString, pfPassphrase = null ) => {
    // Calculate security signature
    let tempParamString = '';
    if (pfPassphrase !== null) {
      pfParamString +=`&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`;
    }
  
    const signature = crypto.createHash("md5").update(pfParamString).digest("hex");
    console.log("Generated Signature: ", signature);
    console.log("pfSignature: ", pfData['signature']);
    
    return pfData['signature'] === signature;
  }; 

module.exports = {
    generateSignature,
    ITN_Signature,
    pfValidSignature
};