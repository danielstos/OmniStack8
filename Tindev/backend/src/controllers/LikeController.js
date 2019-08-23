const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //console.log(req.io, req.connectedtUsers);

        const { user } = req.headers;
        const { devId } = req.params;
       
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }
        if (targetDev.likes.includes(loggedDev._id)) {
            const  loggedSocket = req.connectedtUsers[user];
            const  targetSocket = req.connectedtUsers[devId];
             console.log('Deu macth!!!')
            if(loggedSocket){
                req.io.to(loggedSocket).emit('macth',targetDev);
              
            }
            if(targetSocket){
                req.io.to(targetSocket).emit('macth',loggedDev);
                
            }          
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}