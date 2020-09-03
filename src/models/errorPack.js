let errorPack={
    createJson(err,action,sign){
        return {
            errorMessage:err.toString(),
            action:action,
            sign:sign
        }
    }
}

export {errorPack}