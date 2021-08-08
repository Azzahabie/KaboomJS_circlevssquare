window.addEventListener('DOMContentLoaded', (event) => {
    var refreshBtn = document.getElementById("refreshScore")
    var findscorebtn = document.getElementById("findscorebtn")
    $("#findscorebtn").click(function(){
    });

    fetch("https://desolate-citadel-26138.herokuapp.com/getScore")
    .then(response => response.json())
    .then(data => {
        $('#scoreTable').empty()
        let headers = ` <tr>
        <th>Username</th>
        <th>Score</th>
        </tr>`
        $('#scoreTable').append(headers)
        data.forEach(data => {
            let posthtml = `
            <tr>
            <td>${data.username}</td>
            <td>${data.score}</td>
            </tr>`
            $('#scoreTable').append(posthtml)
        });
    })
    .catch(err=>{
        $('#scoreTable').empty()
        let fail = `<h2>oopsie smth went wrong 😢</h2>`
        $('#scoreTable').append(fail)
    })

    $("#refreshScore").click(function(){
        refreshBtn.disabled = true
        fetch("https://desolate-citadel-26138.herokuapp.com/getScore")
        .then(response => response.json())
        .then(data => {
            
            $('#scoreTable').empty()
            let headers = ` <tr>
            <th>Username</th>
            <th>Score</th>
            </tr>`
            $('#scoreTable').append(headers)
            data.forEach(data => {
                let posthtml = `
                <tr>
                <td>${data.username}</td>
                <td>${data.score}</td>
                </tr>`
                $('#scoreTable').append(posthtml)
            });
        })
        .catch(err=>{
            $('#scoreTable').empty()
            let fail = `<h2>oopsie smth went wrong 😢</h2>`
            $('#scoreTable').append(fail)
        })
        .finally(()=>{
            setTimeout(() => {
                refreshBtn.disabled = false
            }, 10000);
        })
    })

    
    $("#findscorebtn").click(function(){
        let username_input = document.getElementById("findUserScore")
        findscorebtn.disabled = true
        fetch('https://desolate-citadel-26138.herokuapp.com/getUserScore', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({username : username_input.value })
		})
        .then(response => response.json())
        .then(data => {
            $('#userScore-table').empty()
            let headers = ` <tr>
            <th>Username</th>
            <th>Score</th>
            </tr>`
            $('#userScore-table').append(headers)
            data.forEach(data => {
                let posthtml = `
                <tr>
                <td>${data.username}</td>
                <td>${data.score}</td>
                </tr>`
                $('#userScore-table').append(posthtml)
            });
        })
        .catch(err=>{
            $('#userScore-table').empty()
            let fail = `<h2>oopsie smth went wrong 😢</h2>`
            $('#userScore-table').append(fail)
        })
        .finally(()=>{
            setTimeout(() => {
                findscorebtn.disabled = false
            }, 10000);
        })
    })
});