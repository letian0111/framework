function mockLocalStorage() {
    var mock = (function() {
        var store = {};
        return {
            getItem: function(key) {
                return store[key] || null;
            },
            setItem: function(key, value) {
                store[key] = value.toString();
            },
            clear: function() {
                store = {};
            }
        };
    })();
    Object.defineProperty(window, 'localStorage', {
        value: mock
    });
}

function checkMockLocalStorageByQuery() {
    var getQueryString = function(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]); return null;  
    }
    if (getQueryString("mockLocalStorage")) {
        mockLocalStorage();
    }
}
