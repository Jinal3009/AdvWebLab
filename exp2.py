from collections import deque

def water_jug_bfs(m, n, d):
    visited = set()
    queue = deque()
    queue.append((0, 0, []))   # (jug1, jug2, path)

    while queue:
        x, y, path = queue.popleft()

        if (x, y) in visited:
            continue

        visited.add((x, y))
        path = path + [(x, y)]

        # Goal check
        if x == d or y == d:
            return path

        # Possible states
        states = [
            (m, y),                  # Fill jug1
            (x, n),                  # Fill jug2
            (0, y),                  # Empty jug1
            (x, 0),                  # Empty jug2
            (x - min(x, n - y), y + min(x, n - y)),  # Pour jug1 → jug2
            (x + min(y, m - x), y - min(y, m - x))   # Pour jug2 → jug1
        ]

        for state in states:
            if state not in visited:
                queue.append((state[0], state[1], path))

    return None

# Example usage
m = 4  # Capacity of jug1   
n = 3  # Capacity of jug2
d = 2  # Desired amount
result = water_jug_bfs(m, n, d)
if result:
    print("Path to reach the goal:")
    for step in result:
        print(step)
else:
    print("No solution found.")
# Water Jug Problem using BFS
# Capacities of the jugs and the desired amount
