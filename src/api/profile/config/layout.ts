module.exports = {
  layouts: {
    edit: [
      {
        name: 'name',
        size: 6 // Adjust the size of the field in the UI
      },
      {
        name: 'image',
        size: 6
      },
      {
        name: 'summary',
        size: 12
      },
      {
        name: 'experience',
        size: 12
      }
      // Omit 'admin_user' to hide it from the edit view
    ],
    list: [
      'name',
      'image',
      'summary'
      // Omit 'admin_user' to hide it from the list view
    ]
  }
};
