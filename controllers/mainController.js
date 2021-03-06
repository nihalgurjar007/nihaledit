
this.reddit.controller("mainController", ['$scope','MainService','$localStorage','$sessionStorage',
        function($scope,MainService,$localStorage,$sessionStorage){

    $scope.postList = [];
    $scope.$storage = $localStorage.$default({
	    redditBookmarks: [],
	});
	$scope.popup = 0;

    function getPosts(params){
	    MainService.getPosts(params).then(
	        function(response){
	           $scope.postList = response.data.data.children;
	           $scope.after = response.data.data.after;
	        },
	        function(err){
	            alert("Error");
	        });
	};

	$scope.paginationFunction = function(){
		$scope.load = true;
		if($scope.postList.length >= 25){
			let params = '?count=15&after=' + $scope.after;
			MainService.getPosts(params).then(
		        function(response){
		           	for(var i=0;i<response.data.data.children.length;i++){
			            $scope.postList.push(response.data.data.children[i]);
			            $scope.after = response.data.data.after;
		        	}
		        	$scope.load = false;
		            
		        },
		        function(err){
		            alert("Error");
		    });
		}
	};

	$scope.savePost = function(data){
		$scope.$storage.redditBookmarks.push(data);
		data.data.saved = true;
		toastr.info('Post saved successfully');
		console.log(data.data.saved)
	}; 

	$scope.removePost = function(index){
		$scope.$storage.redditBookmarks.splice(index,1);
	}
	$scope.removePostFromList = function(data,index){
		$scope.postList[index].data.saved = false;
		let position = $scope.checkindex(data);
		$scope.removePost(position);
		toastr.info("Post removed from saved collection");
	}

	$scope.showBookmarks = function(){
		$scope.popup = 1;
		$scope.bookMarkedPosts = $scope.$storage.redditBookmarks;
	};

	$scope.checkindex = function(data){
		for (let i=0;i<$scope.$storage.redditBookmarks.length;i++){
		  	if($scope.$storage.redditBookmarks[i].data.id == data.data.id){
		  		return i;
		  		break;
		  	}
		}
	}

	$scope.checkBookmarks = function(data){
		for (let i=0;i<$scope.$storage.redditBookmarks.length;i++){
		  	if($scope.$storage.redditBookmarks[i].data.id == data.data.id){
		  		return true;
		  		break;
		  	}
		  	else{
				return false;
			}
		}
	}

  	getPosts('');

}]);