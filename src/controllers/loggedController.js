

const loggedPainnel = (req, res)=>{

    res.send('chegou !'+ req.userId)
}

module.exports= {
    loggedPainnel
}