let notifyPack = {
    createPack(k,v){
        let value='';
        if(typeof(v)=='string')
            value=v;
        else
            value=JSON.stringify(v);
        return {
            key:k,
            value:value
        };
    },
    createPackJson(k,v){
        return JSON.stringify(this.createPack(k,v));
    }
}

export {notifyPack};