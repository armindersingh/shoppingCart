function utils(){
    return {
        fetchData : async function(url) {
            let response;
            response = await fetch(url);
            if (response.ok) { 
                let json = await response.json();
                return json;
            } else {
                throw new Error(response.status);
            }
        }, generateRandomKeys : function(keyword) {
            return `${keyword}_${ new Date().getTime() }`;
        }
    }
}

function singleton() {
    let instanceOfUtils;
    return {
        getSingletonUtilsObject : function getInstance() {
            if(!instanceOfUtils) {
                instanceOfUtils = new utils();
            }
            return instanceOfUtils;
        }
    }
}

let single = singleton();
export default single.getSingletonUtilsObject();

