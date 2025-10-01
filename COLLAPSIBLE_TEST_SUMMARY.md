# New Collapsible Text Update Test

## Test Added
**File**: `app/__tests__/settings.test.tsx`  
**Test Name**: `"displays correct collapsible text based on todos state"`

## Purpose
This test verifies that the collapsible section in the Settings screen correctly displays the completed todos count and updates when the todos state changes.

## What It Tests

### 1. **Initial State Verification**
- Renders SettingsScreen with mock todos data
- Opens the "Completed Todos" collapsible section
- Verifies the text displays correct completed count: `"You have completed X out of Y todos."`

### 2. **State Change Verification**
- Creates updated mock data with one additional completed todo
- Re-renders SettingsScreen with the updated state
- Opens the collapsible again
- Verifies the text updates to reflect the new completed count

## Key Implementation Details

### Data Setup
```typescript
// Uses mock data from mockedTodosData
const originalCompletedCount = mockedTodosData.todos.filter(todo => todo.completed).length;
const totalTodos = mockedTodosData.total; // 254, not array length (10)
```

### State Management
```typescript
// Creates proper Redux state using entity adapter
const todosAdapter = createEntityAdapter<TToDo>();
const initialTodosState = {
  todos: todosAdapter.setAll(
    todosAdapter.getInitialState({
      offset: 0,
      totalElements: mockedTodosData.total,
      isReachEndOfList: false,
    }),
    mockedTodosData.todos,
  ),
};
```

### UI Interaction Testing
```typescript
// Opens collapsible to reveal content
const collapsibleHeading = getByTestId(collapsibleTestIDs.heading.testID);
fireEvent.press(collapsibleHeading);

// Verifies content is visible and correct
await waitFor(() => {
  const collapsibleContent = getByTestId(collapsibleTestIDs.content.testID);
  expect(collapsibleContent).toBeTruthy();
  expect(getByText(`You have completed ${count} out of ${total} todos.`)).toBeTruthy();
});
```

## Coverage Improvements

This test increases coverage for:
- **Settings component**: Collapsible interaction and text rendering
- **Redux selectors**: `selectCompletedTodos` and `selectTotalTodosCount`
- **State-dependent UI updates**: Verifies UI responds to state changes

## Key Learning Points

1. **Total Count Source**: The total todos count comes from `state.todos.totalElements` (254), not the actual todos array length (10)
2. **Component Integration**: Tests the integration between Redux state, selectors, and UI components
3. **State Comparison**: Uses two different renders to simulate state changes rather than trying to dispatch actions
4. **UI Interaction**: Demonstrates testing of collapsible component behavior

## Test Results
- ✅ All tests pass (14/14)
- ✅ No regressions introduced
- ✅ Coverage maintained at 83.48% overall