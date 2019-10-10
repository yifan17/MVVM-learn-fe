var _mm             = require('util/mm.js');
var _cities         = require('util/cities/cities.js');
var _address        = require('service/address-service.js');
var TemplateaddressModal    = require('./address-modal.string');
var addressModal = {
    show : function(option){
        // option绑定在自己创建的对象上
        // 这样可以让其他方法也能用option
        this.option = option;
        this.option.data = option.data;
        this.$modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 点击省获取城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectProvinceName = $(this).val();
            if(_this.option.isUpdate){
                _this.updateCities(selectProvinceName);
            }else{
                _this.loadCities(selectProvinceName);
            }
        })
        // 点击提交保存收货地址并提交
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
                // 验证通过增加新地址
                if(!isUpdate && receiverInfo.status){
                    _address.addAddress(receiverInfo.data,function(res){
                        _mm.successTips('地址添加成功');
                        _this.hide();
                        // 这里回调一下onsuccess并把res传了回去，因为外层可能会用到res
                        typeof _this.option.onSuccess() === 'function'
                            && _this.option.onSuccess(res);
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    });
                }else if(isUpdate && receiverInfo.status){
                    _address.updateAddress(receiverInfo.data,function(res){
                        _mm.successTips('地址修改成功');
                        _this.hide();
                        typeof _this.option.onSuccess() === 'function'
                            && _this.option.onSuccess(res);
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    })
                }else{
                    _mm.errorTips(receiverInfo.errMsg || 'bug!bug!')
                }
        })
        // 取消一下事件冒泡
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        })
        // 点击叉号或者黑色区域关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        })
    },
    // 关闭窗口
    hide : function(){
        this.$modalWrap.empty();
    },
    // 渲染模版
    loadModal : function(){
        var addressModalHtml = _mm.renderHtml(TemplateaddressModal,{
            isUpdate : this.option.isUpdate,
            data : this.option.data
        });
        $('.modal-wrap').html(addressModalHtml);
        // 加载省份
        this.loadProvince();
    },
    loadProvince : function(){
        // 新增地址
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 更新地址获取原地址
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities : function(provinceName){
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    // 这里为了处理一个细节问题，所以更新城市的时候另写了一个函数
    updateCities : function(provinceName){
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
    },
    // 获取select框里的内容
    getSelectOption : function(optionArray){
        var html = '<option value="">请选择</option>';
        for(var i = 0,Len = optionArray.length;i < Len; i++){
            html += '<option value="'+ optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html;
    },
    // 提交收货地址时候的验证
    getReceiverInfo : function(){
        var receiverInfo = {},
            result = {
                status : false
            };
        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverProvince   = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity       = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        // 验证表单是否都填写
        if(!_mm.validate(receiverInfo.receiverName,'require')){
            result.errMsg = '请输入收件人姓名';
        }else if(!_mm.validate(receiverInfo.receiverProvince,'require')){
            result.errMsg = '请输入收件人所在省份';
        }else if(!_mm.validate(receiverInfo.receiverCity,'require')){
            result.errMsg = '请输入收件人所在城市地址';
        }else if(!_mm.validate(receiverInfo.receiverAddress,'require')){
            result.errMsg = '请输入收件人地址';
        }else if(!_mm.validate(receiverInfo.receiverPhone,'require')){
            result.errMsg = '请输入收件人联系电话';
        }else if(receiverInfo.receiverZip.length > 6){
            result.errMsg = '请输入6位邮政编码';
        }else{
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }
}
module.exports = addressModal;