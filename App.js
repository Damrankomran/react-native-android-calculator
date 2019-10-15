import React, {Component} from 'react';
import {
    Text,
    View, 
    Button,
    TouchableOpacity
} from 'react-native';

class App extends Component{

	constructor(){
		super()
		this.state={
			resultText :"",
			calculationText: ""
		}
		this.operations = ['DEL','+','-','*','/']
	}

	//Deneme deneme

	//işlemin sonucunu ekranda göstericek
	calculateResult(){
		const text = this.state.resultText
		this.setState({
			calculationText: eval(text)
		})
	}

	//2 ve ya daha fazla sayı arasında işlem yapıldığını kontrol edecek
	validate(){
		const text = this.state.resultText
		//slice metodu dizide kendisine parametre olarak verilen indisden başlayarak
		//dizinin sonuna kadar olan kısmı alarak ayrı bir dizi oluşturur.
		switch(text.slice(-1)){
			case '+':
			case '-':
			case '*':
			case '/':
				return false
		}
		return true
	}

	//Rakamların olduğu buttonlara tıklanıldığında çağrılan fonksiyon
  	buttonPressed(text){
	
		if(text == '='){
			return this.validate() && this.calculateResult()
		}

		this.setState({
			resultText : this.state.resultText + text
		})
  	}

	//İşlem buttonlarına tıklanıldığında çalışacak olan fonksiyon
	operate(operation){
		switch(operation){
			case 'DEL':
				let text = this.state.resultText.split('')
				text.pop()
				this.setState({
					resultText: text.join('')
				})
				break
			
			case '+':
				
			case '-':
				
			case '*':
				
			case '/':
				
				//indexOf fonksiyonu verdigimiz karakter veya metnin string içinde geçtigi ilk indeks numarasini döndürür.
				//aranan karakter yoksa -1 döner
				const lastChar =  this.state.resultText.split('').pop()

				if(this.operations.indexOf(lastChar) > 0) return

				if(this.state.resultText == "") return
				this.setState({
					resultText: this.state.resultText + operation
				})
			
		}
	}

	//Görüntüleme
  	render() {

		let rows =[]
		let nums = [[1,2,3], [4,5,6], [7,8,9], [',',0,'=']]
		for(let i = 0 ; i < 4 ; i++){
			let row = []
			for(let j = 0; j < 3; j++){
				row.push(
					<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
						<Text style={styles.btnText}>{nums[i][j]}</Text>
					</TouchableOpacity>
				)
			}
			rows.push(
				<View key={i} style={styles.row}>{row}</View>
			)
		}

		
		let ops = []
		
		for(let i = 0; i < 5 ; i++){
			ops.push(
				<TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])} style={styles.btn}>
					<Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text>
				</TouchableOpacity>
			)
		}
		
		return (
			<View style={styles.container}>
				<View style={styles.result}>
					<Text style={styles.resultText}>{this.state.resultText}</Text>
				</View>
				<View style={styles.calculation}>
				<Text style={styles.calculationText}>{this.state.calculationText}</Text>
				</View>
				<View style={styles.buttons}>
					<View style={styles.numbers}>
						{rows}
					</View>
					<View style={styles.operations}>
						{ops}
					</View>
				</View>
			</View>
		);
  	}
}

/**  STYLES İŞLEMLERİ **/
const styles ={
    container:{
        flex:1,
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
    },
    btnText:{
		fontSize:30,
		color: 'white'
    },
    white:{
        color:'white'
    },
    resultText:{
        fontSize: 54,
		color: 'black',    
		marginRight: 14
    },
    calculationText:{
        fontSize: 34,
		color: 'gray', 
		marginRight: 14
    },
    row:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'

    },
    result:{
        flex:2,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calculation:{
        flex:1,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttons:{
        flex:7,
        flexDirection:'row',
    },
    numbers:{
        flex:3,
		backgroundColor:'#434343',
    },
    operations:{
        flex:1,
        justifyContent: 'space-around',
        backgroundColor:'#636363'
    }
}

export default App;