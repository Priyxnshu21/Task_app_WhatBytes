  import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform, Keyboard } from 'react-native';
import { Appbar, FAB, ActivityIndicator, Searchbar } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // <-- Import for safe area
import { useTaskStore } from '../state/taskStore';
import { AuthService } from '../../data/services/authService';
import AddTaskModal from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import { Task } from '../../domain/models/Task';
import { COLORS } from '../theme/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const groupTasks = (tasks: Task[]) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayStart = today.setHours(0, 0, 0, 0);
  const tomorrowStart = tomorrow.setHours(0, 0, 0, 0);
  const sections: { title: string; data: Task[] }[] = [ { title: 'Today', data: [] }, { title: 'Tomorrow', data: [] }, { title: 'This Week', data: [] }, ];
  tasks.forEach(task => {
    const taskDueDate = new Date(task.dueDate).setHours(0,0,0,0);
    if (taskDueDate === todayStart) sections[0].data.push(task);
    else if (taskDueDate === tomorrowStart) sections[1].data.push(task);
    else sections[2].data.push(task);
  });
  return sections.filter(section => section.data.length > 0);
};

const TaskListScreen = () => {
  const insets = useSafeAreaInsets(); // Hook to get status bar height
  const { tasks, isLoading, fetchTasks, deleteTask, updateTask } = useTaskStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => { fetchTasks(); }, []);
  useEffect(() => { if (!isLoading) { LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); } }, [tasks]);
  
  const filteredTasks = useMemo(() => tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.category.toLowerCase().includes(searchQuery.toLowerCase())), [tasks, searchQuery]);
  const taskSections = useMemo(() => groupTasks(filteredTasks), [filteredTasks]);

  const handleEdit = useCallback((task: Task) => { setTaskToEdit(task); setModalVisible(true); }, []);
  const handleToggleComplete = useCallback((task: Task) => { updateTask(task.id, { isComplete: !task.isComplete }); }, [updateTask]);
  const handleAddNew = () => { setTaskToEdit(undefined); setModalVisible(true); };
  
  const renderHiddenItem = (data: { item: Task }) => ( <View style={styles.taskRowBack}> <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(data.item.id)}> <Appbar.Action icon="delete" color="white" size={24} /> </TouchableOpacity> </View> );
  const renderSectionHeader = ({ section: { title } }: any) => ( <Text style={styles.sectionHeader}>{title}</Text> );

  return (
    <View style={styles.container}>
      {/* --- NEW HEADER STRUCTURE --- */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <LinearGradient colors={['#00897B', '#00695C']} style={StyleSheet.absoluteFillObject} />
        <View style={styles.headerContent}>
          {searchVisible ? (
            <Searchbar placeholder="Search..." onChangeText={setSearchQuery} value={searchQuery} style={styles.searchbar} autoFocus onBlur={() => setSearchVisible(false)} iconColor={COLORS.primary} />
          ) : (
            <>
              <Appbar.Content title="My Tasks" titleStyle={styles.headerTitle} style={{ flex: 1 }} />
              <View style={styles.headerActions}>
                <Appbar.Action icon="magnify" onPress={() => setSearchVisible(true)} color={COLORS.white} />
                <Appbar.Action icon="logout" onPress={() => AuthService.signOut()} color={COLORS.white} />
              </View>
            </>
          )}
        </View>
      </View>

      {isLoading && tasks.length === 0 ? ( <ActivityIndicator style={{ flex: 1 }} size="large" color={COLORS.primary} /> ) : taskSections.length === 0 ? ( <EmptyState /> ) : ( <SwipeListView sections={taskSections} renderItem={({ item }) => ( <TaskItem item={item} onEdit={handleEdit} onToggleComplete={handleToggleComplete} /> )} renderHiddenItem={renderHiddenItem} renderSectionHeader={renderSectionHeader} rightOpenValue={-75} disableRightSwipe keyExtractor={item => item.id} contentContainerStyle={styles.listContent} useSectionList onScroll={() => Keyboard.dismiss()} /> )}
      <FAB style={styles.fab} icon="plus" onPress={handleAddNew} />
      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} taskToEdit={taskToEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  // --- FINAL, POLISHED HEADER STYLES ---
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerActions: {
    flexDirection: 'row',
  },
  searchbar: {
    flex: 1,
    borderRadius: 12,
  },
  // --- END OF HEADER STYLES ---
  listContent: { paddingHorizontal: 16, paddingBottom: 100, },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginTop: 24, marginBottom: 8, paddingHorizontal: 4, },
  taskRowBack: { alignItems: 'center', flex: 1, marginVertical: 1, marginBottom: 12, },
  deleteButton: { alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, width: 75, backgroundColor: COLORS.danger, borderRadius: 16, },
  fab: { position: 'absolute', margin: 24, right: 0, bottom: 0, backgroundColor: COLORS.primary, borderRadius: 18, },
});

export default TaskListScreen;