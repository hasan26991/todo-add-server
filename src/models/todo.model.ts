import mongoose from "mongoose";

interface TodoAttrs {
  message: string;
  userId: string;
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
  createdAt: Date;
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
