class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes 
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for (let i in this) {
            if (this[i] == undefined || this[i] =='' || this[i] == null ) {
                return false                
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId () {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1

    }

    gravar(d) {
        
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegitros(){
       let id =  localStorage.getItem('id')

       let despesas = Array()

        for(let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            
            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }

   

    pesquisar(despesa){
      let despesasFiltradas = Array()
      despesasFiltradas = this.recuperarTodosRegitros()

      if(despesa.ano != '') {
        despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
      }
      if(despesa.mes != '') {
        despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
      }
      if(despesa.dia != '') {
        despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
      }
      if(despesa.tipo != '') {
        despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
      }
      if(despesa.descricao != '') {
        despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
      }
      if(despesa.valor != '') {
        despesasFiltradas =  despesasFiltradas.filter(d => d.valor == despesa.valor)
      }
      
      return despesasFiltradas
    }

    
}

let bd = new Bd()


function cadastrarDespesa() {
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  
  let despesa = new Despesa(
      ano.value, 
      mes.value, 
      dia.value, 
      tipo.value, 
      descricao.value, 
      valor.value
      )


    if (despesa.validarDados()) {
        
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com Sucesso!'
        document.getElementById('modal_header').className = 'modal-header text-success' 
        document.getElementById('modal_body').innerHTML = 'Despesa foi cadastrada com Sucesso!'
        document.getElementById('modal_button').innerHTML = 'Voltar'
        document.getElementById('modal_button').className = 'btn btn-success' 

        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
       

    } else {
        

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão da Despesa'
        document.getElementById('modal_header').className = 'modal-header text-danger' 
        document.getElementById('modal_body').innerHTML = 'Erro na gravação. Verifique se todos os campos foram preenchidos e tente novamente!'
        document.getElementById('modal_button').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_button').className = 'btn btn-danger' 
        
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
   
    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegitros()
    }

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''


    despesas.forEach(function(d) {
        
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        

        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break;
            case '2': d.tipo = 'Educação'
                break;
            case '3': d.tipo = 'Lazer'
                break;
            case '4': d.tipo = 'Saúde'
                break;
            case '5': d.tipo = 'Esporte'
                break;
        
            default:
                break;
        }

        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    });
}

function pesquisarDespesas(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao =  document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesas, true)
}


