const supportsVideo = !!document.createElement("video").canPlayType;
if (supportsVideo) {
    var video = document.getElementById("video");
    var videoControls = document.getElementById("video-controls");
    var videoContainer = document.getElementById("videoContainer");
    var progressBar = document.getElementById("progressBar");
    var currentTime = document.getElementById("currentTime");
    var duration = document.getElementById("duration");
    var playOrPause = document.getElementById("playOrPause");
    var muteOrUnmate = document.getElementById("muteOrUnmate");
    var volumnBar = document.getElementById("volume-bar");
    var fullScreen = document.getElementById("fullScreen");
    var previous = document.getElementById("previous");
    var next = document.getElementById("next");
    var movieInfo = document.getElementById("movieInfo");
    var movieName = document.getElementById("movieName");
    var type = document.getElementById("type");
    var score = document.getElementById("score");
    var year = document.getElementById("year");
    var actors = document.getElementById("actors");
    var director = document.getElementById("director");
    var time = document.getElementById("time");
    var card = document.getElementsByClassName("card");
    var speed1 = document.getElementById("pet-select");
    var menuUp = document.getElementsByClassName("menuUp");
    var menuDown = document.getElementsByClassName("menuDown");
    // hide the default controls
    video.controls = false;

    var movie = [
        {
            "name": "Fast and Furious",
            "year": "2009",
            "director": "林诣彬",
            "screenwriter": "克里斯·摩根 / 盖瑞·斯科特·汤普森",
            "actors": "范·迪塞尔 / 保罗·沃克 / 米歇尔·罗德里格兹 / 乔丹娜·布鲁斯特 / 盖尔·加朵 / 更多...",
            "type": "动作 / 犯罪",
            "score": "7.8",
            "time": "107 min",
            "posterSource": "./Posters/fastandfurious-poster.jpg",
            "videoSource": "Movie Trailers//fastandfurious-trailer.mov"
        },
        {
            "name": "God Father",
            "year": "2012",
            "director": "凯文·布恩斯",
            "screenwriter": "凯文·布恩斯",
            "actors": "阿尔·帕西诺 / 弗朗西斯·福特·科波拉 / 詹姆斯·肯恩",
            "type": "纪录片",
            "score": "7.8",
            "time": "95 min",
            "posterSource": "./Posters/godfather-poster.jpg",
            "videoSource": "Movie Trailers//Godfather-trailer.mov"
        },
        {
            "name": "Hunt For The Wilder People",
            "year": "2016",
            "director": "塔伊加·维迪提",
            "screenwriter": "塔伊加·维迪提 / 巴瑞·克鲁普 / 特阿雷巴·卡希",
            "actors": "朱利安·迪尼森 / 山姆·尼尔 / 瑞玛·特·维塔 / 瑞切尔·豪斯 / 蒂欧蕾欧尔·娜塔-墨尔本 / 更多...",
            "type": "剧情 / 喜剧 / 冒险",
            "score": "8.1",
            "time": "101 min",
            "posterSource": "./Posters/huntforthewilderpeople-poster.jpg",
            "videoSource": "Movie Trailers//huntforthewilderpeople-trailer.mov"
        },
        {
            "name": "Men in Black 3",
            "year": "2012",
            "director": "巴里·索南菲尔德",
            "screenwriter": "伊坦·柯亨 / 劳威尔·坎宁安",
            "actors": "威尔·史密斯 / 汤米·李·琼斯 / 乔什·布洛林 / 杰梅奈·克莱门特 / 艾玛·汤普森 / 更多...",
            "type": "喜剧 / 动作 / 科幻",
            "score": "7.7",
            "time": "106 min",
            "posterSource": "./Posters/meninblack3-poster.jpg",
            "videoSource": "Movie Trailers//meninblack3-trailer.mov"
        },
        {
            "name": "Sherlock Holmes 2",
            "year": "2011",
            "director": "盖·里奇",
            "screenwriter": "阿瑟·柯南·道尔 / 基兰·马尔罗尼 / 米歇尔·马尔罗尼",
            "actors": "小罗伯特·唐尼 / 裘德·洛 / 瑞秋·麦克亚当斯 / 劳米·拉佩斯 / 斯蒂芬·弗雷 / 更多...",
            "type": "动作 / 悬疑 / 犯罪",
            "score": "7.7",
            "time": "129 min",
            "posterSource": "./Posters/sherlockholmes2-poster.jpg",
            "videoSource": "Movie Trailer//sherlockholmes2-trailer.mov"
        }
    ];

    var movieNameList = [];
    movie.forEach(i => {
        movieNameList.push(i.name);
    });

    var posterSourceList = [];
    movie.forEach(i => {
        posterSourceList.push(i.posterSource);
    });

    movieNameList.forEach(i => {
        let Node = '<option value="' + i + '">';
        document.getElementById('MovieList').insertAdjacentHTML('beforeend', Node);
    });

    // initial the default display, the first movie in the list
    var len = movie.length;
    var current = 0;
    ChangeMovieInfo(current);
    progressBar.value = 0;
    video.current = 0;

    // initial poster list
    posterSourceList.forEach(i => {
        let index = posterSourceList.indexOf(i);
        var card = '<div class="card" id =' + index + '>'
        var childPoster = '<div class="poster"><img src="' + i + '" alt="' + movieNameList[index] + '" /></div>';
        var childDetails = '<div class="details"><h5>' + movieNameList[index] + '</h5></div>';
        var nodeEnd = '</div>';
        var Node = `${card}${childPoster}${childDetails}${nodeEnd}`;
        document.getElementById('movieNameList1').insertAdjacentHTML('beforeend', Node);
    })

    for (var i = 0; i < card.length; i++) {
        // add every card a custom property
        card[i].index = i;
        card[i].onclick = function () {
            ChangeMovieInfo(this.index);
            video.play();
        }
    }

    // play all: set loop list
    video.addEventListener("ended", function () {
        video.currentTime = 0;
        if (current == len) current = -1;
        current += 1;
        ChangeMovieInfo(current);
        video.play();
    });

    // play or pause (for click video & control menu)
    function clickPlayorPause() {
        if (video.paused || video.ended) {
            video.play();
            playOrPause.className = 'fa fa-stop fa-2x';
            document.getElementById("play").style.display = "none";
            document.getElementById("pause").style.display = "block";
        } else {
            video.pause();
            playOrPause.className = 'fa fa-play fa-2x';
            document.getElementById("play").style.display = "block";
            document.getElementById("pause").style.display = "none";
        }
    }

    playOrPause.addEventListener("click", (e) => {
        clickPlayorPause();
    });

    // keyboard action
    document.onkeydown = function (event) {
        console.log("keyCode:" + event.keyCode);
        var e = event || window.event || arguments.callee.caller.arguments[0];
        // prevent page go down
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
        if (e && e.keyCode === 37) {
            // keyborad: Left
            video.currentTime !== 0 ? backward(5) : 1;
            document.getElementById("forward5s").style.display = "none";
            document.getElementById("backward5s").style.display = "block";
            return false;
        } else if (e && e.keyCode === 39) {
            // keyborad: Right
            video.volume !== video.duration ? forward(5) : 1;
            document.getElementById("backward5s").style.display = "none";
            document.getElementById("forward5s").style.display = "block";
            return false;
        } else if (e && e.keyCode === 32) {
            // key board: Tab
            if (video.paused) {
                video.play();
                playOrPause.className = 'fa fa-stop fa-2x';
            } else {
                video.pause();
                playOrPause.className = 'fa fa-play fa-2x';
            }
            return false;
        } else if (e && e.keyCode === 38) {
            // keyborad: Up
            if (video.volume <= 0.9) {
                video.volume = video.volume + 0.1;
            } else {
                video.volume = 1;
            }
            volumnBar.value = video.volume;
        } else if (e && e.keyCode === 40) {
            // keyborad: Down
            if (volumnBar.value >= 0.1) {
                video.volume = video.volume - 0.1;
            } else {
                video.volume = 0;
            }
            volumnBar.value = video.volume;
        } else if (e && e.keyCode === 27) { 
            // ESC key
            handleFullscreen();
            return false;
        }
    }

    // mute and unmute
    muteOrUnmate.addEventListener("click", (e) => {
        video.muted = !video.muted;
        if (video.muted) {
            muteOrUnmate.className = 'fa fa-volume-off fa-2x';
            volumnBar.value = 0;
        } else {
            muteOrUnmate.className = 'fa fa-volume-up fa-2x';
            volumnBar.value = 0.6;
        }
    });

    // volume bar
    volumnBar.addEventListener("input", (e) => {
        let currentVolume = volumnBar.value;
        video.volume = currentVolume;
        if (currentVolume == 0) {
            muteOrUnmate.className = 'fa fa-volume-off fa-2x';
        } else {
            muteOrUnmate.className = 'fa fa-volume-up fa-2x';
        }
    });

    // set duration
    video.addEventListener("loadedmetadata", () => {
        progressBar.value = 0;
        duration.textContent = formatTime(video.duration);
    });

    // update progress
    video.addEventListener("timeupdate", () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.value = percent;
        currentTime.textContent = formatTime(video.currentTime);
    });

    // set progress bar
    progressBar.addEventListener('input', () => {
        console.log(progressBar.value);
        progressBar.value = 0;
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });

    // format time[mm:ss]
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // forward 5s
    const forwardButton = document.getElementById("forward");
    forwardButton.addEventListener("click", (e) => {
        video.volume !== video.duration ? forward(5) : 1;
    });

    function forward(second) {
        this.video.currentTime += second;
    }

    // backward 5s
    const backwardButton = document.getElementById("backward");
    backwardButton.addEventListener("click", (e) => {
        video.currentTime !== 0 ? backward(5) : 1;
    });

    function backward(second) {
        this.video.currentTime -= second;
    }

    function changeSpeed() {
        var index = speed1.selectedIndex;
        var speed = speed1.options[index].text;
        video.playbackRate = speed;
    }

    // full screen
    if (!document?.fullscreenEnabled) {
        fullScreen.style.display = "none";
    }
    fullScreen.addEventListener("click", (e) => {
        handleFullscreen();
    });
    function handleFullscreen() {
        if (document.fullscreenElement !== null) {
            // The document is in fullscreen mode
            document.exitFullscreen();
            setFullscreenData(false);
        } else {
            // The document is not in fullscreen mode
            video.requestFullscreen();
            // videoContainer.requestFullscreen();
            setFullscreenData(true);
        }
    }
    function setFullscreenData(state) {
        video.setAttribute("data-fullscreen", !!state);
    }
    document.addEventListener("fullscreenchange", (e) => {
        setFullscreenData(!!document.fullscreenElement);
        console.log(document.fullscreenElement);

        if (document.fullscreenElement) {
            // Show custom controls in fullscreen mode
            menuUp.style.display = 'block';
            menuDown.style.display = 'block';
        }
    });

    // function onKeypress(event) {
    //     // 按下esc键，键盘左上角
    //     if (event.keyCode === KeyCodeEnum.esc && this.isWebFullscreen) {
    //         this.exitWebFullscreen();
    //     }
    // }

    // previous movie
    previous.addEventListener("click", (e) => {
        if (current == len) current = 0;
        current -= 1;
        if (current < 0) current += 5
        ChangeMovieInfo(current);
        video.play();
    });

    // next movie
    next.addEventListener("click", (e) => {
        if (current == len - 1) current = -1;
        current += 1;
        ChangeMovieInfo(current);
        video.play();
    });

    // search bar 
    const searchValue = document.getElementById("searchValue");
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function(event) {
        // console.log(searchValue.value);
        var index = movieNameList.indexOf(searchValue.value);
        console.log(index);
        if (index != -1) {
            ChangeMovieInfo(index);
        } else {
            alert("don\'t has this movie");
        }
    });

    searchValue.addEventListener('input', function(event) {
        // 在这里编写处理用户输入的逻辑
        console.log(searchValue.value);
    });

    function ChangeMovieInfo(index) {
        movieInfo.innerText = movie[index].name;
        movieName.innerHTML = movie[index].name;
        video.src = movie[index].videoSource;
        type.innerText = movie[index].type;
        score.innerText = movie[index].score;
        year.innerText = movie[index].year;
        actors.innerText = movie[index].actors;
        time.innerText = movie[index].time;
        director.innerText = movie[index].director;
    }
}