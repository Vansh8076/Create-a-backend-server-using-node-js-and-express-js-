// Mock database store
let users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com' }
];

// @desc    Get all users
// @route   GET /api/users
exports.getAllUsers = (req, res) => {
    res.status(200).json(users);
};
// @desc    Get single user
// @route   GET /api/users/:id
exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
};
// @desc    Create new user
// @route   POST /api/users
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Please provide both name and email' });
    }
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
};
// @desc    Update user details
// @route   PUT /api/users/:id
exports.updateUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    res.status(200).json(user);
};
// @desc    Delete user record
// @route   DELETE /api/users/:id
exports.deleteUser = (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(index, 1);
    res.status(200).json({ message: 'User successfully deleted' });
};
