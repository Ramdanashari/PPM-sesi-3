import { useState } from "react"
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";



const TodoList =() =>{
    const [editingId, setEditingId] = useState <number | null>(null)
    const [title, setTitle] = useState<string>('');
    const [todo, setTodo] = useState<any[]>([
        {
            id: 1,
            title: 'Learn React native',
            complated: false,
        }
    ])

    const handleAddOrEditTodo = () => {
        if (!title){
            Alert.alert('error', 'please enter your todo')
            return
        }

        if (editingId){
            setTodo(todo.map(item => item.id === editingId ? {...item, title} : item))
            setEditingId(null)
        }else {
            const newTodo = {
                id: todo.length + 1,
                title: title,
                complated: false,
            }
            setTodo([...todo, newTodo])
        }

        setTitle('')
    }
    
    const handleEditTodo = (id: number) => {
        const todoToEdit = todo.find(item => item.id === id)
        if (todoToEdit) {
            setTitle(todoToEdit.title)
            setEditingId(id)
        }
    }

    const handleDeleteTodo = (id:number) => {
        setTodo(todo.filter(item => item.id !== id))
    }


    return (
        <View style={{flex:1,paddingHorizontal:10, marginTop:10, backgroundColor:'#ff66'}}>
            <View style={style.A}>
                <TextInput placeholder="Enter tour todo" 
                style={style.B}
                value={title}
                onChangeText={setTitle}>
                </TextInput>
                <Pressable style={{backgroundColor:"blue", padding:10 ,borderRadius:5, height: 40}}
                onPress={handleAddOrEditTodo}>
                    <Text style={{color:"white",}}>
                        {editingId ? 'Edit' : 'Add'} Todo
                    </Text>
                </Pressable>
            </View>
            {todo.map(item => (
                <View key={item.id} style={{flexDirection:"row", marginBottom: 10}}>
                    <Text  style={{ fontSize:16, color:"black",}}>
                         {item.title}
                    </Text>
                    <View style={{flex:1}}>
                    </View>
                    <Pressable style={style.C}>
                        <Text style={{ color:'white', fontSize:12, fontFamily:'fantasy'}}
                        onPress={() => handleDeleteTodo(item.id)}>
                            Delete 
                        </Text>
                    </Pressable>
                    <Pressable style={style.D}
                    onPress={() => handleEditTodo(item.id)}>
                        <Text style={{color:'white', fontSize:12, fontFamily:'fantasy'}}>
                            Edit
                        </Text>
                    </Pressable>
                </View>
            ))}
        </View>
    )
}

export default TodoList


const style = StyleSheet.create({
    A:{
        flexDirection:"row", 
        justifyContent:"center", 
        alignItems:"center", 
        marginBottom:10, 
        gap:10,
    },

    B:{
        flex:1, 
        borderColor:"black",
        borderWidth:1, 
        padding:10, 
        fontFamily:"fantasy"
    },

    C:{
        backgroundColor:'orange', 
        padding:12, 
        borderRadius:10, 
        height:40
    },
    
    D:{
        backgroundColor: 'orange', 
        padding: 12, 
        borderRadius: 10, 
        height: 40, 
        marginLeft: 10
    },
})