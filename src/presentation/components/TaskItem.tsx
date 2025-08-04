import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Checkbox, Chip } from 'react-native-paper';
import { Task } from '../../domain/models/Task';
import { COLORS } from '../theme/colors';

interface TaskItemProps {
  item: Task;
  onEdit: (item: Task) => void;
  onToggleComplete: (item: Task) => void;
}

// Helper function to get styles for the priority chip
const getPriorityStyles = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return { backgroundColor: '#FFEBEE', textColor: '#C62828' }; // Light Red BG, Dark Red Text
    case 'medium':
      return { backgroundColor: '#FFFDE7', textColor: '#F9A825' }; // Light Yellow BG, Dark Yellow Text
    case 'low':
    default:
      return { backgroundColor: '#E8F5E9', textColor: '#2E7D32' }; // Light Green BG, Dark Green Text
  }
};

const TaskItem = ({ item, onEdit, onToggleComplete }: TaskItemProps) => {
  const priorityStyles = getPriorityStyles(item.priority);

  return (
    <Card style={styles.taskCard}>
      <TouchableOpacity style={styles.taskRowFront} onPress={() => onEdit(item)}>
        <Checkbox.Android
          status={item.isComplete ? 'checked' : 'unchecked'}
          onPress={() => onToggleComplete(item)}
          color={COLORS.primary}
        />
        <View style={styles.taskTextContainer}>
          <Text style={[styles.taskTitle, item.isComplete && styles.taskComplete]}>
            {item.title}
          </Text>
          <View style={styles.chipRow}>
            <Chip 
              icon="tag-outline" 
              style={[styles.chip, { backgroundColor: COLORS.primaryLight }]} 
              textStyle={[styles.chipText, { color: COLORS.primary }]}
            >
              {item.category}
            </Chip>
            {/* New Priority Chip */}
            <Chip 
              style={[styles.chip, { backgroundColor: priorityStyles.backgroundColor }]}
              textStyle={[styles.chipText, { color: priorityStyles.textColor }]}
            >
              {item.priority}
            </Chip>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  taskCard: { marginBottom: 12, elevation: 2, borderRadius: 16 },
  taskRowFront: { alignItems: 'center', backgroundColor: COLORS.surface, flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 20, borderRadius: 16 },
  taskTextContainer: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  taskTitle: { fontSize: 16, color: COLORS.text, fontWeight: '500', marginBottom: 8 },
  taskComplete: { textDecorationLine: 'line-through', color: COLORS.subtleText },
  chipRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  chip: { height: 28, justifyContent: 'center', marginRight: 8, borderRadius: 8 },
  chipText: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
});

export default React.memo(TaskItem);