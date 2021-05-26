<template>

  <div>
    <h2>¡¡Bienvenido a la registradora de libros!!</h2>
    <form @submit.prevent="estatusEditar ? updateTodo() : addTodo()">
      
        <fieldset> 
        <legend>  Agregar un libro al registro </legend> 
        <label for="tituloLibro">Titulo del libro:</label><br>
        <input type="text"  v-model="titulo" id="tituloLibro" required> <br>

        <label for="autorLibro">Autor del libro:</label><br>
        <input type="text" v-model="autor" id="autorLibro" required> <br>

        <button type="submit">{{estatusEditar ? "editar": "Agregar"}} </button>
        <button v-if="estatusEditar" @click="estatusEditar= false, titulo='', autor=''"> Cancelar</button> <!-- TITULO -->
        </fieldset>
      
    </form>

    <img src="https://i.pinimg.com/originals/16/37/3d/16373d2729709ee8d8ba97245f683501.gif" v-if="cargando">
    
    <!-- {{estatusEditar}} -->
    

    <ol>
      <li v-for=" todo in todos" :key="todo.id">
          {{todo.titulo}} - {{todo.autor}}  <!-- TITULO Y AUTOR -->
          <button @click="deleteTodo(todo)">Eliminar</button>
          <button @click="selecTodo(todo)">Editar</button>
      </li>
    </ol>
  </div>
</template>

<script>

import  {db} from './firebase'

export default {
  titulo: 'App',   //TITULO
  data() {
    return {
      todos: [],
      id: "",
      titulo: "",  //TITULO
      autor: "",              //AUTOR
      cargando: false,
      estatusEditar: false
    }
  },
  created(){
    this.listarTodos();
  },
  methods: {
    async listarTodos(){

          this.cargando = true;
         const data = await db.collection("todos").get();
          this.todos = data.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
          
          this.cargando = false;
          console.log(this.todos)
    },
    async addTodo(){
      await db.collection('todos').add(
        {
          titulo: this.titulo,   //TITULO
          autor: this.autor                    //AUTOR
        }
      )
      this.titulo = "";   //TITULO
      this.autor = "";                           //AUTOR
      this.listarTodos();
    },
    async deleteTodo(todo){

      if (confirm(`Estas seguro que desea eliminar ${todo.titulo} de ${todo.autor}`)){    //TITULO Y AUTOR
      await db.collection('todos').doc(todo.id).delete();
      this.listarTodos();
      }
    },
    selecTodo(todo){
      this.estatusEditar = true;
      this.id = todo.id;
      this.titulo = todo.titulo;  //TITULO
      this.autor = todo.autor;                      //AUTOR
    },
    async updateTodo(){
      await db.collection('todos').doc(this.id).set(
        {
          titulo: this.titulo,    //TITULO
          autor: this.autor                         //AUTOR
        }
      )

      this.estatusEditar = false;
      this.id = "";
      this.titulo = "";    //TITULO
      this.autor = "";                      //AUTOR
      this.listarTodos();
    }
  },
}
</script>


<style>

fieldset{
  
  width:0px ; 
  margin: auto; 
  border:  thin solid #333;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #11181f;  
  margin-top: 120px;
   
}

ol{
  width:400px ;
  margin-left: 460px;
  margin-top: 25px;

  }

body{
  background-image: url('https://img.wallpapersafari.com/desktop/1440/900/60/24/nMRo9t.jpg');
  background-size: cover;
}
Button
    {
        margin:3px;
    }
</style>
