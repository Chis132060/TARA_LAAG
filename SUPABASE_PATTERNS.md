# GalaGuide Supabase Query Patterns Guide

This document explains the common database operations and code patterns used throughout the GalaGuide application to interact with the Supabase backend. It covers how data is fetched, created, modified, and deleted.

## 1. Method Chaining (The Fluent API)
Supabase uses a "fluent API" design, meaning you chain methods together to build a complete SQL query.

```javascript
// This reads exactly like SQL: SELECT * FROM destinations WHERE region = 'Visayas'
const { data, error } = await supabase
  .from("destinations")
  .select("*")
  .eq("region", "Visayas");
```

## 2. Reading Data (SELECT)

### Fetching All Records
To get all rows from a table, use `.select()`.
```javascript
const { data, error } = await supabase
  .from("destinations")
  .select("*");
```

### Fetching Specific Columns
To get only the data you need (which improves performance and saves bandwidth), specify the column names as a comma-separated string.
```javascript
const { data, error } = await supabase
  .from("destinations")
  .select("id, name, location, rating");
```

### Fetching a Single Record
If you are querying by a specific ID and only expect exactly one result to exist, append `.single()`. This returns a single object instead of an array of objects.
```javascript
const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("id", userId)
  .single();
```

## 3. Filtering Data (WHERE clauses)

Supabase provides several methods to filter your data.

*   **`.eq(column, value)`**: Equals. Matches exactly.
*   **`.neq(column, value)`**: Not equals.
*   **`.gt(column, value)`**: Greater than.
*   **`.lt(column, value)`**: Less than.
*   **`.ilike(column, pattern)`**: Case-insensitive text search. Useful for search bars (e.g., `%beach%`).
*   **`.in(column, array)`**: Matches if the column value is inside the provided array.

**Example: Complex Filtering**
You can chain multiple filters together. They act as an "AND" condition.
```javascript
const { data, error } = await supabase
  .from("destinations")
  .select("*")
  .eq("status", "active")
  .gt("rating", 4.5)
  .ilike("name", "%beach%"); 
```

## 4. Modifying Data (INSERT, UPDATE, DELETE)

### Inserting New Records (INSERT)
Pass an object (or an array of objects for bulk inserts) to add new rows to the database.
```javascript
const { error } = await supabase
  .from("itineraries")
  .insert({
    user_id: currentUser.id,
    title: "Cebu Summer Trip",
    duration_days: 3
  });
```

### Updating Existing Records (UPDATE)
**Important:** Always use a filter like `.eq()` when updating, otherwise you will accidentally update every single row in the table!
```javascript
const { error } = await supabase
  .from("users")
  .update({ 
    status: "approved", 
    is_active: true 
  })
  .eq("id", targetUserId);
```

### Deleting Records (DELETE)
Like updates, always include a filter so you don't delete everything in the table.
```javascript
const { error } = await supabase
  .from("favorites")
  .delete()
  .eq("user_id", currentUserId)
  .eq("destination_id", destinationId);
```

## 5. Sorting and Limiting

### Ordering Results
Use `.order(column, { ascending: boolean })` to sort your data.
```javascript
const { data, error } = await supabase
  .from("destinations")
  .select("*")
  .order("rating", { ascending: false }); // Highest rated first
```

### Limiting Results
Use `.limit(number)` to restrict how many rows are returned. Useful for pagination or "Top 5" lists.
```javascript
const { data, error } = await supabase
  .from("destinations")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(5); // Get only the 5 newest destinations
```

## 6. Authentication Patterns

Supabase handles user accounts and sessions directly via the `supabase.auth` object.

**Sign Up:**
```javascript
const { data, error } = await supabase.auth.signUp({
  email: userEmail,
  password: userPassword,
});
```

**Sign In:**
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: userEmail,
  password: userPassword,
});
```

**Get Current Logged-in User:**
```javascript
// Safely gets the currently logged-in user from the active session
const { data: { user } } = await supabase.auth.getUser();
```

## 7. Error Handling (Try / Catch)

Almost all Supabase operations return an object containing `{ data, error }` through object destructuring. 

*   **`data`**: Contains the result of your query (if successful). It is `null` if it fails.
*   **`error`**: Contains details if the query failed (e.g., network issue, permissions error, syntax error). It is `null` if successful.

**Best Practice:** Always check if `error` exists before trying to use `data`.

```javascript
try {
  // 1. Make the request
  const { data, error } = await supabase.from("destinations").select("*");
  
  // 2. Check for errors
  if (error) {
    throw error; // This throws the error down into the 'catch' block below
  }
  
  // 3. If no error, it is safe to use 'data' here
  console.log("Successfully fetched data:", data);
  
} catch (error) {
  // 4. Handle the error (show a toast notification, log it, etc.)
  console.error("Database operation failed:", error.message);
}
```
