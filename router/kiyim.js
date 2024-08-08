const { Router } = require('express');

const kiyim = Router();
const {
    updateKiyim,
    getKiyim,
    createKiyim,
    deleteKiyim,
    searchKiyim,
        
} = require('../controller/kiyim')

kiyim.get('/getKiyim', getKiyim);
kiyim.post('/createKiyim', createKiyim);
kiyim.put('/updateKiyim/:_id', updateKiyim);
kiyim.delete('/deleteKiyim/:_id', deleteKiyim);
kiyim.get('/searchKiyim', searchKiyim);

module.exports = kiyim;