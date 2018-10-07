
this.reddit.factory('MainService', function($http) {

	function getPosts(params){
        return $http({
            url: 'https://www.reddit.com/.json' + params,
            method: 'GET'});
    }

    return {
        getPosts : getPosts
    };

});