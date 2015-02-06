// start our angular module and inject userService
angular.module('userCtrl', ['userService'])

// user controller for the main page
// inject the User factroy
.controller('userController', function(User) {
	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the users at page load
	User.all()
		.success(function(data) {
			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = data;
		});

	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id)
			.success(function(data) {
				// get all users to update the table
				// you can also setup your api
				// to return the list of users with the delete call
				User.all()
					.success(function(data) {
						vm.processing = false;
						vm.users = data;
					});
			});
	};
})

.controller('userCreateController', function(User) {
	var vm = this;

	// variable to hide/show elements of the view
	// differentiate between create or edit pages
	vm.type = 'create';

	vm.saveUser() = function() {
		vm.processing = true;

		// clear the messages
		vm.message = true;

		// use the create function in the userService
		User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.userData = {};
				vm.message = data.message;
			});
	};
})
