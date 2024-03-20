// crear los selectores
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')
const formulario = document.querySelector('#nueva-cita')
const contenedorCitas =document.querySelector('#citas')
let editar
class citas {
    constructor(){
        this.citas = []
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas); // como se van agregando las citas
    }

    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !==id)
    }

    editarCita(citaAct){
        this.citas = this.citas.map(citas=> citas.id === citaAct.id ? citaAct : citas) 
    }

}

class ui{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center','alert','d-block','col-12')
    
    if(tipo==='error'){
        divMensaje.classList.add('alert-danger')
    }else{
        divMensaje.classList.add('alert-success')
    }

    divMensaje.textContent = mensaje
    document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('#agregar-cita'))
    setTimeout(()=>{
        divMensaje.remove()
    },3000)
}

    imprimirCitas({citas}){
       // console.log('print cittas');
        this.limpiarHTML()
        citas.forEach(citas=> {
            const{mascota,propietario,telefono,fecha,hora,sintomas,id} = citas
            const divCita = document.createElement('div')
            divCita.classList.add('cita','p-3');
            // estoy creando un atributo personalizado
            divCita.dataset.id =id
                //generar los textos para la ficha cita
                const mascotaParrafo = document.createElement('h2')
                mascotaParrafo.classList.add('card-title','font-weight-bolder')
                mascotaParrafo.textContent = mascota

                const propietarioParrafo = document.createElement('p')
                propietarioParrafo.innerHTML = `
                    <span class = "font-weight-bolder"> propietario: ${propietario}</span>
                `
                const telefonoParrafo = document.createElement('p')
                telefonoParrafo.innerHTML = `
                    <span class = "font-weight-bolder"> telefono: ${telefono}</span>
                `

                const fechaParrafo = document.createElement('p')
                fechaParrafo.innerHTML = `
                    <span class = "font-weight-bolder"> fecha: ${fecha}</span>
                `

                const horaParrafo = document.createElement('p')
                horaParrafo.innerHTML = `
                    <span class = "font-weight-bolder"> hora: ${hora}</span>
                `
                const sintomasParrafo = document.createElement('p')
                sintomasParrafo.innerHTML = `
                    <span class = "font-weight-bolder"> sintomas: ${sintomas}</span>
                `
                const btnEliminar = document.createElement('button')
                btnEliminar.classList.add('btn','btn-danger','mr-2')
                btnEliminar.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
                btnEliminar.onclick = ()=> eliminarCita(id)

                const btnEditar = document.createElement('button')
                btnEditar.classList.add('btn','btn-info')
                btnEditar.innerHTML=`
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                `
                btnEditar.onclick = ()=> cargarEdicion(citas)
                divCita.appendChild(mascotaParrafo)
                divCita.appendChild(propietarioParrafo)
                divCita.appendChild(fechaParrafo)
                divCita.appendChild(horaParrafo)
                divCita.appendChild(sintomasParrafo)
                divCita.appendChild(btnEliminar)
                divCita.appendChild(btnEditar)
                contenedorCitas.appendChild(divCita)
        });
    
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}
const administrarCitas = new citas() //instancia
const useri = new ui ()
//crear eventos 
eventListener()
function eventListener(){
    mascotaInput.addEventListener('input',datosCitas)
    propietarioInput.addEventListener('input',datosCitas)
    telefonoInput.addEventListener('input',datosCitas)
    fechaInput.addEventListener('input',datosCitas)
    horaInput.addEventListener('input',datosCitas)
    sintomasInput.addEventListener('input',datosCitas)
    formulario.addEventListener('submit',nuevaCita)
}

//estructura para guardar info

const citasObj = {
    mascota :'',
    propietario :'',
    telefono : '',
    fecha : '',
    hora : '',
    sintomas : ''
}

function datosCitas(e){
    //guardar valores dentro del objeto 
    citasObj[e.target.name] = e.target.value
}

function nuevaCita(e){
    //validar y agregar una nueva cita 
    e.preventDefault();

    //extraer la informacion del objeto cita
    const {mascota,propietario,telefono,fecha,hora,sintomas} = citasObj

    if( mascota ==="" || propietario ==="" || telefono ==="" || fecha ==="" || hora ==="" || sintomas ===""){
        useri.imprimirAlerta('Todos los Campos Son Obligatorios','error')
        return;
    }

    if(editar){
        //console.log('esot editando');

        formulario.querySelector('button[type = submit]').textContent = "Crear Cita"
        editar= false;

        administrarCitas.editarCita({...citasObj})

        useri.imprimirAlerta('Se Ha modificado la cita Correctamente')
    }else{
        //dartos completos para crear la nueva cita
        console.log(('creando nueva cita'));
        citasObj.id = Date.now()
        administrarCitas.agregarCita({...citasObj})
        
        useri.imprimirAlerta('Se ha agregado su cita Satisfactoriamente')
        //console.log(citasObj);


    }


    //reset el formulario
    formulario.reset()
    reiniciarObjeto()
    useri.imprimirCitas(administrarCitas)
}

function reiniciarObjeto(){
    citasObj.mascota = "";
    citasObj.propietario ='';
    citasObj.telefono ="";
    citasObj.fecha="";
    citasObj.hora="";
    citasObj.sintomas="";
}

function eliminarCita(id){
    administrarCitas.eliminarCita(id)
    //mostar un mensaje
    useri.imprimirAlerta("la cita se ha eliminado correctamente")

    //actualizar
    useri.imprimirCitas(administrarCitas)
    
}

function cargarEdicion(cita){
    const{mascota,propietario,telefono,fecha,hora,sintomas,id} = cita

    //llenar los inputs 
    mascotaInput.value= mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    sintomasInput.value =sintomas
    horaInput.value =hora
    //llenar objeto
    citasObj.mascota =mascota
    citasObj.propietario =propietario
    citasObj.telefono=telefono
    citasObj.fecha=fecha
    citasObj.hora=hora
    citasObj.sintomas=sintomas
    citasObj.id=id

    formulario.querySelector('button[type=submit]').textContent = 'guardar'
    editar =true
}