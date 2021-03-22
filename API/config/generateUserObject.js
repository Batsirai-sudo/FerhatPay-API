const generateUserObject = (data) => {
	return {
		user: {
			FullName: data.givenName,
			LastName: data.familyName,
			Password: data.password,
			Email: data.email,
			DOB: data.dateOfBirth,
			gender: data.gender,
			State: data.city,
			StreetAddress: data.streetAddress,
			NationalID: data.nationalID,
			StudentID: data.studentID,
			salt: data.salt,
			user_status: 'Active',
			passwordResetStatus: 'False',
			ContactNo: data.mobile,
			API_Key_Secret: data.API_Key_Secret,
			API: '',
		},
		account: {
			UserID: '',
			Status: 'Active',
			AccountBalance: 0,
			AccountNumber: data.mobile,
		},
	};
};

module.exports = generateUserObject;
