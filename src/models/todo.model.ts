import mongoose from "mongoose";

interface TodoAttrs {
  message: string;
  userId: string;
  //   "userId": "643bca55dd25ab961ffe3031",
  //     "message": "Complete presentation for team meeting on Friday",
  //     "completed": false,
  //     "date": "1681640246492",
  //     "id": "643bcb674dbd383d844e589d"
}

// An interface that describes the properties that a User Modal has
interface TodoModal extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttrs): TodoDoc;
}

// An interface that describes the properties that a User Document has
interface TodoDoc extends mongoose.Document {
  message: string;
  completed: boolean;
  userId: string;
}

const todoSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.date = ret.createdAt;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

todoSchema.statics.build = (attrs: TodoAttrs) => {
  return new Todo(attrs);
};

const Todo = mongoose.model<TodoDoc, TodoModal>("Todo", todoSchema);

export { Todo };
