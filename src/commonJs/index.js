  /**
   * 驗證功能
   */
  const verify  = {
    /**
     * 數字驗證
     * @param {String} str 需檢查字串 
     * @returns {Boolean} 
     */
    NumberVerify : function(str)  {
      let regExp = /^[0-9]+$/;
      if (regExp.test(str)) {
          return true;
      } else {
          return false;
      }
    },

    /**
     * 檢查字串是否只存在英文與數字
     * @param {String} str 需檢查字串  
     * @returns 
     */
    EnglishNumberVerify: function(str) {
      let regExp = /^[0-9a-zA-Z]+$/;
      if (regExp.test(str)) {
          return true;
      } else {
          return false;
      }
    },


    /**
     * 身分證驗證
     * @param {String} value 身分證ID
     * @returns 
     */
    TaiwanIdVerify: function(value) {
      //參考 https: //hackmd.io/@CynthiaChuang/CheckUID

      //基本預設資料
      let 編號規則 = {
          區域碼: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
          區域名: ['臺北市', '臺中市', '基隆市', '臺南市', '高雄市', '新北市', '宜蘭縣', '桃園縣', '嘉義市', '新竹縣', '苗栗縣', '臺中縣', '南投縣', '彰化縣', '新竹市', '雲林縣', '嘉義縣', '臺南縣', '高雄縣', '屏東縣', '花蓮縣', '臺東縣', '金門縣', '澎湖縣', '陽明山管理局', '連江縣'],
          縣市代碼轉換值: ['10', '11', '12', '13', '14', '15', '16', '17', '34', '18', '19', '20', '21', '22', '35', '23', '24', '25', '26', '27', '28', '29', '32', '30', '31', '33']
      };
      //權重參數
      let 權重 = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

      //轉為大寫
      let 身分證號碼 = value.toUpperCase();

      //檢查身分證
      var 檢查身分證號碼 = /^([A-Z]{1})([0-9]{9})$/;
      if (!檢查身分證號碼.test(身分證號碼)) {
          return false;
      }
      //檢查區域碼
      var 檢查區域碼 = 編號規則.區域碼.indexOf(身分證號碼.charAt(0));
      if (檢查區域碼 == -1) {
          return false;
      }
      //檢查性別
      var 性別 = '';
      switch (身分證號碼.charAt(1)) {
          case '1':
              性別 = '男性';
              break;
          case '2':
              性別 = '女性';
              break;
          default:
              return false;
      }

      //檢查身分證權重  
      var 檢查身分證權重 = 編號規則.縣市代碼轉換值[檢查區域碼] + 身分證號碼.substring(1, 10);
      var 總和 = 0;
      for (var i = 0; i < 11; i++) {
          總和 += 權重[i] * parseInt(檢查身分證權重.charAt(i));
      }
      //若總和為 10 的倍數，即為有效的驗證碼。
      if (總和 % 10 == 0) {
          return true;
      } else {
          return false;
      }
    },

    /**
     * Email驗證
     * @param {String} email 
     * @returns 
     */
     EmailVerify: function(email) {
      let reg = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
      if (reg.test(email)) {
          return true;
      } else {
          return false;
      }
    },
    /**
     * 市內電話驗證
     * @param {String} tel 
     * @returns 
     */
    TelephoneVerify: function(tel) {
        let regExp = /^0\d{1,3}-\d{6,10}$/;
        if (regExp.test(tel)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 手機格式驗證
     * @param {String} tel 
     * @returns 
     */
    PhoneVerify: function(tel) {
        let regExp = /^09\d{8}$/;
        if (regExp.test(tel)) {
            return true;
        } else {
            return false;
        }
    }
  }

  /**
   * 數字相關
   */
  const Number = {
     /**
     * 千分數
     * @param {Int,String} num 
     * @returns 
     */
     thousandComma: function(num) {
      if (num == null || num == undefined || num == '') {
          console.log('缺少num參數');
          return
      }
      var str = num.toString();
      var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(reg, "$1,");
  }
  }

  module.exports = {
    verify,
    Number
  }