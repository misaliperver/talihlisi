angular.module("MyApp", ["ngCookies"])

.controller("tabCtrl", function($scope, $interval, $http, $cookieStore, $httpParamSerializer) {
    $scope.nguniversities = universities;

    $scope.couple2raffle = function(){
        $('#create-raffle-close').click();
    }
    $scope.post_couple2raffle = function(){
        var url = "";
        url =   "/couple" +
                "?email=" + $('#emailInput').val() +
                "&title=" + $('#titleInput').val() +
                "&issue=" + $('#issueInput').val() +
                "&limit=" + $('#limitInput').val() +
                "&admin=" + $('#adminInput').val();
        console.log(url)
        $http.get(url) 
        .success(function(response) {
            var r = response.raffle;
            $('#create-couple2raffle-modal-close').click();
            $('#show-couple2raffle-modal-title').text(r.title);
            $('#show-couple2raffle-modal-body-p').text(r.issue);
            $('#show-couple2raffle-modal-body-date').text(r.cdate);
            $('#show-couple2raffle-modal-body-limit').text(r.limit);
            $('#show-couple2raffle-modal-body-PaylasInput').val(window.location.href + "/" +r.url);
            $('#show-couple2raffle-modal-body-AdminInput').val(window.location.href + "/" +r.url + "?admin=" + r.deleteurl);
            
        });
    }
  
    console.log($scope.universitiesx)
});