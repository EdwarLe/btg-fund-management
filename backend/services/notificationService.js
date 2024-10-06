exports.sendNotification = async (type, message) => {
    if (type === 'email') {
        console.log(`Sending email notification: ${message}`);
        //Todo Implement email sending logic here
    } else if (type === 'sms') {
        console.log(`Sending SMS notification: ${message}`);
        //Todo Implement SMS sending logic here
    }
};