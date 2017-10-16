(function () {
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
    var balance_url = './scripts/coinhive-balance.php';
    var balanceContainer, 
        balanceContainerBeer, 
        balanceContainerSpeed;

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
        balanceContainer = balanceContainer || document.getElementById('balance-container');
        balanceContainerBeer = balanceContainerBeer || document.getElementById('balance-container-beer');
        balanceContainerSpeed = balanceContainerSpeed || document.getElementById('balance-container-speed');

        if (!balanceContainer) return;

        get(balance_url, function(response) {
            response = JSON.parse(response);
            
            balanceContainer.innerText = Math.round10(response.xmrPending || 0, -5);
            balanceContainerBeer.innerText = Math.round10((response.xmrPending || 0) * 100, -2);
            balanceContainerSpeed.innerText = response.hashesPerSecond || 0;
        });
    
    }

    setInterval(balanceUpdate, 1000);
    balanceUpdate(); 
})();