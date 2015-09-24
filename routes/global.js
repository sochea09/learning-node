//show log
exports.log = function (inst) {
    console.dir(inst.get())
}

exports.fail = function(data, message){
    return {status: false, data: data, message: message}
}
exports.success = function(data, message){
    return {status: true, data: data, message: message}
}