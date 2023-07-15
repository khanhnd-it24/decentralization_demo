export const Action: {
  CREATE: 'CREATE';
  READ: 'READ';
  UPDATE: 'UPDATE';
  DELETE: 'DELETE';
} = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

export type Action = (typeof Action)[keyof typeof Action];
