import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Text, IconButton, Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTaskStore } from '../state/taskStore';
import { Task } from '../../domain/models/Task';
import { COLORS } from '../theme/colors';

// ... interface (no change)
interface Props { visible: boolean; onClose: () => void; taskToEdit?: Task; }

const AddTaskModal = ({ visible, onClose, taskToEdit }: Props) => {
  // ... logic (no change)
  const { addTask, updateTask } = useTaskStore();
  const [title, setTitle] = useState(''); const [description, setDescription] = useState(''); const [category, setCategory] = useState('Work'); const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium'); const [date, setDate] = useState(new Date()); const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => { if (taskToEdit) { setTitle(taskToEdit.title); setDescription(taskToEdit.description); setCategory(taskToEdit.category); setPriority(taskToEdit.priority); setDate(new Date(taskToEdit.dueDate)); } else { setTitle(''); setDescription(''); setCategory('Work'); setPriority('medium'); setDate(new Date()); } }, [taskToEdit, visible]);
  const onDateChange = (event: any, selectedDate?: Date) => { const currentDate = selectedDate || date; setShowDatePicker(Platform.OS === 'ios'); setDate(currentDate); };
  const handleSubmit = async () => { if (!title) return; const taskPayload = { title, description, category, priority, dueDate: date.getTime() }; if (taskToEdit) { await updateTask(taskToEdit.id, taskPayload); } else { await addTask(taskPayload as any); } onClose(); };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <IconButton icon="close" style={styles.closeButton} onPress={onClose} />
        <Text style={styles.title}>{taskToEdit ? 'Edit Task' : 'Add New Task'}</Text>
        <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput label="Description (Optional)" value={description} onChangeText={setDescription} style={styles.input} multiline />
        <TextInput label="Category (e.g., Work)" value={category} onChangeText={setCategory} style={styles.input} />
        <Text style={styles.label}>Priority</Text>
        <View style={styles.chipContainer}>
          {(['low', 'medium', 'high'] as const).map(p => (
            <Chip 
              key={p} 
              selected={priority === p} 
              onPress={() => setPriority(p)} 
              style={[styles.chip, priority === p && styles.chipSelected]}
              textStyle={[styles.chipText, priority === p && styles.chipTextSelected]}
            >
              {p}
            </Chip>
          ))}
        </View>
        <Button onPress={() => setShowDatePicker(true)} icon="calendar" textColor={COLORS.primary}>
          Due Date: {date.toLocaleDateString()}
        </Button>
        {showDatePicker && (<DateTimePicker testID="dateTimePicker" value={date} mode="date" display="default" onChange={onDateChange} />)}
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          {taskToEdit ? 'Save Changes' : 'Create Task'}
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: COLORS.background },
    closeButton: { position: 'absolute', top: 45, right: 10 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: COLORS.text },
    input: { marginBottom: 16, backgroundColor: COLORS.surface, borderRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
    label: { fontSize: 16, color: COLORS.subtleText, marginBottom: 10, marginTop: 10, paddingLeft: 4 },
    chipContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
    chip: { flex: 1, marginHorizontal: 4, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
    chipSelected: { backgroundColor: COLORS.primary },
    chipText: { color: COLORS.text },
    chipTextSelected: { color: COLORS.white },
    button: { backgroundColor: COLORS.primary, paddingVertical: 10, borderRadius: 12, marginTop: 24, elevation: 2 },
});

export default AddTaskModal;