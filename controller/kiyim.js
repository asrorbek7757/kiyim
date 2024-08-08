const Kiyim = require('../model/kiyimSchema');


let time = new Date();
let addDay = time.getDay() +"."+ (time.getMonth() + 1) + "." + time.getFullYear();


// ---------searching------
const searchKiyim = async (req, res)=>{
    const {query} = req.query;

    try{
        const kiyim = await Kiyim.find({
            $or: [{
                    name:
                        {$regex: query, $options: 'i' }},
                  {
                    model:
                         {$regex: query, $options: 'i'}
            }]
        });
        res.json({
            success: true,
            message: "Searching successfull!",
            innerData: kiyim
        })
    }catch(error){
        res.json({ success: true, message: error })
    }
}






// ---------Get kiyim----
const getKiyim = async (req, res)=>{
    try{
        let allKiyim = await Kiyim.find();
        if (!allKiyim){
            return  res.json({
                success: false,
                message: "Kiyim is not found!",
                innerData: allKiyim
            })
        }
        res.json({
            success: true,
            message: "Kiyim is found!",
            innerData: allKiyim
        })
    }catch(error){
        res.json({ success: true, message: error })
    }
}


// ------create kiyim------------
const createKiyim = async (req, res) => {
    console.log(req.body);
    try {
        const { title, model, desc, color } = req.body;

        // Maydonlarning to'liq to'ldirilganligini tekshirish
        if (!title || !model || !desc || !color) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Kiyim obyektini yaratish va saqlash
        const createData = new Kiyim({
            title,
            model,
            desc,
            color,
            addDay // agar foydalanishingiz kerak bo'lsa
        });
        const savedKiyim = await createData.save();

        // Kiyim ma'lumotlarini muvaffaqiyatli qo'shildi deb xabar berish
        res.status(201).json({ success: true, message: "Kiyim created successfully.", data: savedKiyim });
    } catch (error) {
        // Xatoni konsolga chiqarish
        console.error(error);
        // Xatolik yuzaga keldi deb foydalanuvchiga xabar berish
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}


//------delete kiyim-----
const deleteKiyim = async (req, res) => {
    console.log("ok");
    try {
        const { _id } = req.params; // "id" ni URL dan olish
        console.log(_id);
        const deletedKiyim = await Kiyim.findByIdAndDelete({id:_id});
        if (!deletedKiyim) {
            return res.status(404).json({ success: false, message: "Kiyim not found" });
        }
        res.json({ success: true, message: "Kiyim deleted successfully", data: deletedKiyim });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


//------update kiyim-----
const updateKiyim = async (req, res)=>{
    try{
        let { _id } = req.params;
        let body = req.body;
        let updated = await Kiyim.updateMany({ id: _id, body});
        if (!updated) {
            return res.json({
                success: false,
                message: "Kiyim is not updated!",
                innerData: updated
            })
        }
        res.json({
            success: true,
            message: "Kiyim is updated!",
            innerData: updated
        })

    }catch(error){
        res.json({ success: true, message: error })
    }
}

module.exports = {
    updateKiyim,
    getKiyim,
    createKiyim,
    deleteKiyim,
    searchKiyim,


}

