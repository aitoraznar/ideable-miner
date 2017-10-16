var miner = null;
    var ip = window.myip || null;
    try {
        if (ip) {
            console.log('Gracias', myip, 'por tu minado!', 'Eres bienvenido a tomar birras con nosotros!');
            miner = new CoinHive.User('N0McPYQV4Y7Qsqa0JcuusSCKMFfLofv1', myip, {threads: 2, throttle: 0.5});    
        } else {
            console.log('No sabemos quién eres pero eres bienvenido a tomar birras con nosotros!');
            miner = new CoinHive.Anonymous('N0McPYQV4Y7Qsqa0JcuusSCKMFfLofv1', {threads: 2, throttle: 0.5});    
        }
        
    } catch(e) {}

    var ui = new MinerUI(miner, {
        container: document.getElementById('miner'),
        canvas: document.getElementById('mining-stats-canvas'),
        hashesPerSecond: document.getElementById('mining-hashes-per-second'),
        hashesPerSecond: document.getElementById('mining-hashes-per-second'),
        threads: document.getElementById('mining-threads'),
        threadsAdd: document.getElementById('mining-threads-add'),
        threadsRemove: document.getElementById('mining-threads-remove'),
        hashesTotal: document.getElementById('mining-hashes-total'),
        startButton: document.getElementById('mining-start'),
        stopButton: document.getElementById('mining-stop'),
        blkWarn: document.getElementById('blk-warning')
    });

    //Start mining
    ui.start();


    //---------------------- Balance update
    var balanceContainer = document.getElementById('balance');

    var balance_url = './scripts/coinhive-balance.php';
    var balanceContainerBeer = document.getElementById('balance-container-beer');
    var balanceContainerSpeed = document.getElementById('balance-container-speed');

    function get(url, cb) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                cb(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    function balanceUpdate() {
        get(balance_url, function(response) {
            
            balanceContainer.text = Math.round10(response.xmrPending || 0, -5);
            balanceContainerBeer.text = Math.round10((response.xmrPending || 0) * 100, -5);
            balanceContainerSpeed.text = response.hashesPerSecond || 0;
        });
    
    }

    setInterval(balanceUpdate, 1000);