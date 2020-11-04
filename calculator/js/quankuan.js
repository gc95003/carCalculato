var calculator = new function(){
    let carCostParseFloat = function(val) {
		if (void 0 == val)
			return 0;
		if (isNaN(val))
			return 0;
		if ("" == val)
			return 0;
		var result = parseFloat(val);
		return 0 > result && (result = 0),
			result
	},
	validate = function(val) {
		if (void 0 == val)
			return !0;
		if ("" == val)
			return !0;
		var reg = new RegExp("^[0-9]+(.)?([0-9]{0,8})?$");
		return reg.test(val) ? !0 : !1
	};
	this.formatNum = function(num, n) {
		num = String(parseFloat(num).toFixed(n));
		for (var re = /(-?\d+)(\d{3})/; re.test(num);)
			num = num.replace(re, "$1,$2");
		return num
	};
	
	function CarPurchaseCost() {
		this.carCostParam = {
				reSetCustom: !0,
				carPrice: 0,
				prepaymentCustom: 0,
				prepaymentPercent: .3,
				loanYears: 1,
				licenseTaxCustom: 0,
				usageTaxCustom: 0,
				displacement: 1.6,
				seatCount: 5,
				isImport: 0,
				thirdInsureClaim: 1e5,
				passengerInsureCustom: 0,
				carBodyInsureClaim: 5e3,
				CommInsureCheck: {
					thirdCheck: !0,
					damageCheck: !0,
					stolenCheck: !0,
					glassCheck: !0,
					combustCheck: !0,
					noDeductibleCheck: !0,
					noLiabilityCheck: !0,
					passengerCheck: !0,
					carBodyCheck: !0
				}
			},
			this.getPositive = function(val) {
				return parseFloat(val) < 0 ? 0 : val
			},
			this.getPrepayment = function() {
				var carPrice = this.carCostParam.carPrice,
					percent = this.carCostParam.prepaymentPercent;
				return this.carCostParam.reSetCustom || 0 == this.carCostParam.prepaymentCustom ? 0 == percent ? this.carCostParam.prepaymentCustom :
					carPrice * percent : this.carCostParam.prepaymentCustom
			},
			this.getBankLoan = function() {
				var carPrice = this.carCostParam.carPrice;
				return carPrice - this.getPrepayment()
			},
			this.getMonthPay = function() {
				var bankLoan = this.getBankLoan(),
					loanYears = this.carCostParam.loanYears,
					months = 0,rate = 0;
				return months = 12 * loanYears,
					1 == loanYears ? rate = .0656 / 12 : 2 == loanYears ? rate = .0665 / 12 : 3 == loanYears ? rate = .0665 / 12 : 4 ==
					loanYears ? rate = .069 / 12 : 5 == loanYears && (rate = .069 / 12),
					bankLoan * (rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1))
			},
			this.getPurchaseTax = function() {
				return this.carCostParam.carPrice / 1.17 * .1 //这里购置税计算修改过 By 谷城
			},
			this.getLicenseTax = function() {
				return this.carCostParam.reSetCustom ? 500 : this.carCostParam.licenseTaxCustom
			},
			this.getUsageTax = function(displacement) {
				var displacement = displacement || this.carCostParam.displacement;
				return this.carCostParam.reSetCustom ? 1 >= displacement ? 300 : displacement > 1 && 1.6 >= displacement ? 420 :
					displacement > 1.6 && 2 >= displacement ? 480 : displacement > 2 && 2.5 >= displacement ? 900 : displacement > 2.5 &&
					3 >= displacement ? 1920 : displacement > 3 && 4 >= displacement ? 3480 : displacement > 4 ? 5280 : 480 : this.carCostParam
					.usageTaxCustom
			},
			this.getTrafficInsurance = function() {
				var seatCount = this.carCostParam.seatCount;
				return 6 > seatCount ? 950 : 1100
			},
			this.getThirdInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.thirdCheck)
					return 0;
				var thirdInsureClaim = this.carCostParam.thirdInsureClaim,
					seatCount = this.carCostParam.seatCount;
				if (6 > seatCount)
					switch (thirdInsureClaim) {
						case 5e4:
							return 516;
						case 1e5:
							return 746;
						case 2e5:
							return 924;
						case 5e5:
							return 1252;
						case 1e6:
							return 1630;
						default:
							return 746
					}
				else
					switch (thirdInsureClaim) {
						case 5e4:
							return 478;
						case 1e5:
							return 674;
						case 2e5:
							return 821;
						case 5e5:
							return 1094;
						case 1e6:
							return 1425;
						default:
							return 674
					}
				return 746
			},
			this.getDamageInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.damageCheck)
					return 0;
				var carPrice = this.carCostParam.carPrice,
					seatCount = this.carCostParam.seatCount,
					base = 459;
				return seatCount >= 6 && (base = 550),
					base + .01088 * carPrice
			},
			this.getStolenInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.stolenCheck)
					return 0;
				var carPrice = this.carCostParam.carPrice,
					seatCount = this.carCostParam.seatCount;
				return seatCount >= 6 ? 119 + .00374 * carPrice : 102 + .004505 * carPrice
			},
			this.getGlassInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.glassCheck)
					return 0;
				var carPrice = this.carCostParam.carPrice,
					isImport = this.carCostParam.isImport;
				return 1 == isImport ? .0025 * carPrice : .0015 * carPrice
			},
			this.getCombustInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.combustCheck)
					return 0;
				var carPrice = this.carCostParam.carPrice;
				return .0015 * carPrice
			},
			this.getNoDeductibleInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.noDeductibleCheck)
					return 0;
				var damageInsurance = this.getDamageInsurance(),
					thirdInsurance = this.getThirdInsurance();
				return void 0 == damageInsurance || void 0 == thirdInsurance ? 0 : .2 * (damageInsurance + thirdInsurance)
			},
			this.getNoLiabilityInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.noLiabilityCheck)
					return 0;
				var thirdInsurance = this.getThirdInsurance();
				return void 0 == thirdInsurance ? 0 : .2 * thirdInsurance
			},
			this.getPassengerInsurance = function() {
				return this.carCostParam.CommInsureCheck.passengerCheck ? this.carCostParam.reSetCustom ? 50 : this.carCostParam.passengerInsureCustom :
					0
			},
			this.getCarBodyInsurance = function() {
				if (!this.carCostParam.CommInsureCheck.carBodyCheck)
					return 0;
				var carPrice = this.carCostParam.carPrice,
					carBodyInsureClaim = this.carCostParam.carBodyInsureClaim;
				return 2e3 == carBodyInsureClaim ? carPrice > 0 && 3e5 >= carPrice ? 400 : carPrice > 3e5 && 5e5 >= carPrice ? 585 :
					carPrice > 5e5 ? 850 : 0 : 5e3 == carBodyInsureClaim ? carPrice > 0 && 3e5 >= carPrice ? 570 : carPrice > 3e5 &&
					5e5 >= carPrice ? 900 : carPrice > 5e5 ? 1100 : 0 : 1e4 == carBodyInsureClaim ? carPrice > 0 && 3e5 >= carPrice ?
					760 : carPrice > 3e5 && 5e5 >= carPrice ? 1170 : carPrice > 5e5 ? 1500 : 0 : 2e4 == carBodyInsureClaim ? carPrice >
					0 && 3e5 >= carPrice ? 1140 : carPrice > 3e5 && 5e5 >= carPrice ? 1780 : carPrice > 5e5 ? 2250 : 0 : 0
			}
	}
	
	CarPurchaseCost.prototype.getCarPurchaseCost = function(costParam) {
		var carLoanFee, carPurchaseTax, carInsurance, carPurchaseFee;
		for (let key in costParam)
			void 0 !== costParam[key] && (this.carCostParam[key] = costParam[key]);
	    carLoanFee = {
				years: 1,
				months: 12,
				prepayment: 0,
				bankLoan: 0,
				monthPay: 0,
				getRepayment: function() {
					return this.monthPay * this.months
				}
			},
			carPurchaseTax = {
				purchaseTax: 0,
				licenseTax: 0,
				usageTax: 0,
				getTotal: function() {
					return this.purchaseTax + this.licenseTax + this.usageTax
				}
			},
			carInsurance = {
				trafficInsurance: 0,
				thirdInsurance: 0,
				damageInsurance: 0,
				stolenInsurance: 0,
				glassInsurance: 0,
				combustInsurance: 0,
				noDeductibleInsurance: 0,
				noLiabilityInsurance: 0,
				passengerInsurance: 0,
				carBodyInsurance: 0,
				getCommerceTotal: function() {
					return this.thirdInsurance + this.damageInsurance + this.stolenInsurance + this.glassInsurance + this.combustInsurance +
						this.noDeductibleInsurance + this.noLiabilityInsurance + this.passengerInsurance + this.carBodyInsurance
				},
				getInsuranceTotal: function() {
					return this.trafficInsurance + this.thirdInsurance + this.damageInsurance + this.stolenInsurance + this.glassInsurance +
						this.combustInsurance + this.noDeductibleInsurance + this.noLiabilityInsurance + this.passengerInsurance + this.carBodyInsurance
				}
			},
			carPurchaseFee = {
				carPrice: 0,
				carLoanFee: carLoanFee,
				carPurchaseTax: carPurchaseTax,
				carInsurance: carInsurance,
				getCommerceInsurance: function() {
					return this.carInsurance.getCommerceTotal()
				},
				getTotalPrepayment: function() {
					return this.carLoanFee.prepayment + this.carPurchaseTax.getTotal() + this.carInsurance.getInsuranceTotal()
				},
				getTotal: function() {
					return this.carPrice + this.carPurchaseTax.getTotal() + this.carInsurance.getInsuranceTotal()
				},
				getTotalLoan: function() {
					return this.carLoanFee.prepayment + this.carLoanFee.getRepayment() + this.carPurchaseTax.getTotal() + this.carInsurance
						.getInsuranceTotal()
				},
				getLoanMoreCost: function() {
					return this.getTotalLoan() < this.getTotal() ? 0 : this.getTotalLoan() - this.getTotal()
				},
				getTotalTax: function() {
					return this.carPurchaseTax.getTotal() + this.carInsurance.trafficInsurance
				},
				getTotalInsurance: function() {
					return carInsurance.trafficInsurance + this.carInsurance.getCommerceTotal()
				},
				getMarketCommerce: function() {
					return carInsurance.trafficInsurance + Math.round(.9 * this.carInsurance.getCommerceTotal())
				}
			};
			carPurchaseFee.carPrice = this.getPositive(this.carCostParam.carPrice),
			carPurchaseFee.carLoanFee.years = this.getPositive(this.carCostParam.loanYears),
			carPurchaseFee.carLoanFee.months = this.getPositive(12 * this.carCostParam.loanYears),
			carPurchaseFee.carLoanFee.prepayment = this.getPositive(Math.round(this.getPrepayment())),
			carPurchaseFee.carLoanFee.bankLoan = this.getPositive(Math.round(this.getBankLoan())),
			carPurchaseFee.carLoanFee.monthPay = this.getPositive(Math.round(this.getMonthPay())),
			carPurchaseFee.carPurchaseTax.purchaseTax = this.getPositive(Math.round(this.getPurchaseTax())),
			carPurchaseFee.carPurchaseTax.licenseTax = this.getPositive(Math.round(this.getLicenseTax())),
			carPurchaseFee.carPurchaseTax.usageTax = this.getPositive(Math.round(this.getUsageTax())),
			carPurchaseFee.carInsurance.trafficInsurance = this.getPositive(Math.round(this.getTrafficInsurance())),
			carPurchaseFee.carInsurance.thirdInsurance = this.getPositive(Math.round(this.getThirdInsurance())),
			carPurchaseFee.carInsurance.damageInsurance = this.getPositive(Math.round(this.getDamageInsurance())),
			carPurchaseFee.carInsurance.stolenInsurance = this.getPositive(Math.round(this.getStolenInsurance())),
			carPurchaseFee.carInsurance.glassInsurance = this.getPositive(Math.round(this.getGlassInsurance())),
			carPurchaseFee.carInsurance.combustInsurance = this.getPositive(Math.round(this.getCombustInsurance())),
			carPurchaseFee.carInsurance.noDeductibleInsurance = this.getPositive(Math.round(this.getNoDeductibleInsurance())),
			carPurchaseFee.carInsurance.noLiabilityInsurance = this.getPositive(Math.round(this.getNoLiabilityInsurance())),
			carPurchaseFee.carInsurance.passengerInsurance = this.getPositive(Math.round(this.getPassengerInsurance())),
			carPurchaseFee.carInsurance.carBodyInsurance = this.getPositive(Math.round(this.getCarBodyInsurance()));
			return carPurchaseFee
	};
	let carPrice = 0,getCarCostParam = function(dk,traveltax,jqx,dsz,scratches,glass,licenseTax,csPersonRisk,checkList,prepaymentPercent,loanYears) {
		let reSetCustom = !0;
		if(licenseTax != 500 || csPersonRisk!=50) {
			reSetCustom = false;
		}
		
		let carCostParam = {
			reSetCustom: reSetCustom,
			carPrice: carCostParseFloat(carPrice),
			prepaymentCustom: 0,
			prepaymentPercent: .3,
			loanYears: 3,
			licenseTaxCustom: 0,
			usageTaxCustom: 0,
			displacement: 1.6,
			seatCount: 5,
			isImport: 0,
			thirdInsureClaim: 1e5,
			passengerInsureCustom: 0,
			carBodyInsureClaim: 5e3,
			CommInsureCheck: {
				thirdCheck: !0,
				damageCheck: !0,
				stolenCheck: !0,
				glassCheck: !0,
				combustCheck: !0,
				noDeductibleCheck: !0,
				noLiabilityCheck: !0,
				passengerCheck: !0,
				carBodyCheck: !0
			}
		};
		
		if(dk){
			carCostParam.prepaymentPercent = prepaymentPercent;//首付比例
			carCostParam.prepaymentCustom = 0; //首付金额暂时不支持自定义，可以自己改
			carCostParam.loanYears = loanYears;//贷款年限
		}
		// carCostParam.carPrice = carCostParseFloat(carPrice); //车总价
		carCostParam.licenseTaxCustom = carCostParseFloat(licenseTax); //上牌费
		
		carCostParam.usageTaxCustom = carCostParseFloat(traveltax.usageTaxCustom);//车船使用税
		carCostParam.displacement = carCostParseFloat(traveltax.value); //车船使用税选择框
		
		carCostParam.seatCount = carCostParseFloat(jqx.value); //交通事故责任强制保险
		carCostParam.isImport = carCostParseFloat(glass.value);//玻璃单独破碎险 选择框
		carCostParam.thirdInsureClaim = carCostParseFloat(dsz.value); //第三者责任险
		carCostParam.passengerInsureCustom = carCostParseFloat(parseFloat(csPersonRisk));//车上人员责任险
		carCostParam.carBodyInsureClaim = carCostParseFloat(scratches.value);//车身划痕险,
		carCostParam.CommInsureCheck.thirdCheck = checkList[0]; //第三者责任险开关
		carCostParam.CommInsureCheck.damageCheck = checkList[1];//车辆损失险开关
		carCostParam.CommInsureCheck.stolenCheck = checkList[2]; //全车盗抢险开关
		carCostParam.CommInsureCheck.glassCheck = checkList[3];//玻璃单独破碎险开关
		carCostParam.CommInsureCheck.combustCheck = checkList[4];//自燃损失险开关
		carCostParam.CommInsureCheck.noDeductibleCheck = checkList[5];//不计免赔特约险开关
		carCostParam.CommInsureCheck.noLiabilityCheck = checkList[6];//无过责任险开关
		carCostParam.CommInsureCheck.passengerCheck = checkList[7];//车上人员责任险开关
		carCostParam.CommInsureCheck.carBodyCheck = checkList[8];//车身划痕险开关
		return carCostParam;
	};
	
	this.calculator = function(dk,price,traveltax,jqx,dsz,scratches,glass,licenseTax,csPersonRisk,checkList,loanOp){
		carPrice = price;
		if(dk == null){dk = false};
		var handler = new CarPurchaseCost;
		var usageTaxCustom = handler.getUsageTax(traveltax.value);//这里根据车船税的值获取车船税钱
		if(usageTaxCustom){
			traveltax.usageTaxCustom = usageTaxCustom;
		}
		let param = getCarCostParam(dk,traveltax,jqx,dsz,scratches,glass,licenseTax,csPersonRisk,checkList,loanOp.PrepaymentPercent,loanOp.LoanYears);
		let carPurchaseFee = handler.getCarPurchaseCost(param);
		return carPurchaseFee;
	}
}

export default calculator;