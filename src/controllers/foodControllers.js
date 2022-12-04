const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../config/reponse');
const like_res = require('../models/like_res');
const getLike = async (req, res) => {
    try {
        let dataLike = await model.like_res.findAll({
            include: ["re", "user"]
        });
        successCode(res, dataLike, 'Lấy dữ liệu thành công');
    }
    catch (err) {
        failCode(res, "", 'Lấy dữ liệu thất bại');
    }

}
const getUserLike = async (req, res) => {
    try {
        let userLike = await model.like_res.findAll({
            include: 'user'
        })
        successCode(res, userLike, 'Lấy dữ liệu thành công');
    }
    catch (err) {
        failCode(res, "", "Lấy dữ liêu thất bại");
    }

}
const getReslike = async (req, res) => {
    try {
        let resLike = await model.like_res.findAll({
            include: 're'
        })
        successCode(res, resLike, "Lấy dữ liệu thành công");
    }
    catch (err) {
        failCode(res, "", "Lấy dữ liêu thất bại");

    }
}
const createLikeUnlike = async (req, res) => {
    try {
        let { user_id, res_id, date_like } = req.body;
        let checkLike = await model.like_res.findOne({
            where: {
                user_id
            }
        })
        if (checkLike) {
            let result = await model.like_res.destroy({
                where: {
                    user_id,
                    res_id
                }
            });
            successCode(res, result, "Bạn đã Unlike ");
        }
        else {
            let result = await model.like_res.create({ user_id, res_id, date_like });
            successCode(res, result, "Like thành công");
        }
    }
    catch (err) {
        errorCode(res, "Lỗi BE");
    }
}
const addRate = async (req, res) => {
    try {
        let { user_id, res_id, amount, date_rate } = req.body;
        let checkRes = await model.rate_res.findOne({
            where: {
                user_id,
                res_id
            }
        })
        if (checkRes) {
            failCode(res, { user_id, res_id, amount, date_rate }, "Bạn đã đánh giá nhà hàng này rồi")
        }
        else {
            let result = await model.rate_res.create({ user_id, res_id, amount, date_rate });
            successCode(res, result, "Đánh giá thành công")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi BE")
    }
}
const getUserRate = async (req, res) => {
    try {
        let userLike = await model.rate_res.findAll({
            include: 'user'
        })
        successCode(res, userLike, 'Lấy dữ liệu thành công');
    }
    catch (err) {
        failCode(res, "", "Lấy dữ liêu thất bại");
    }

}
const getResRate = async (req, res) => {
    try {
        let userLike = await model.rate_res.findAll({
            include: 're'
        })
        successCode(res, userLike, 'Lấy dữ liệu thành công');
    }
    catch (err) {
        failCode(res, "", "Lấy dữ liêu thất bại");
    }
}
const createUserOrder = async (req, res) => {
    try {
        let { user_id, food_id, amount, code, arr_sub_id } = req.body;
        let checkOrder = await model.order.findOne({
            where: {
                user_id,
                food_id
            }
        })
        if (checkOrder) {
            failCode(res, "", "Bạn đã đặt món rồi")
        }
        else {
            let result = await model.order.create({ user_id, food_id, amount, code, arr_sub_id });
            successCode(res, result, "Đặt đồ ăn thành công");
        }

    }
    catch (err) {
        errorCode(res,"Lỗi BE")
    }
}

module.exports = { getLike, getUserLike, getReslike, createLikeUnlike, addRate, getUserRate, getResRate, createUserOrder }