import { create } from "zustand";

type Comment = {
  commentId: string;
  authorName: string;
  //   postedAt: Date;
  text: string;
  author: string;
  //   articleId: string;
};

type CommentsStore = {
  comments: Comment[];
  setStoreComments: (comments: Comment[]) => void;
  addStoreComment: (comment: Comment) => void;
  updateStoreComment: (commentId: string, newText: string) => void;
  deleteStoreComment: (commentId: string) => void;
};

export const useCommentsStore = create<CommentsStore>((set) => ({
  comments: [],
  setStoreComments: (comments) => set(() => ({ comments: comments })),
  addStoreComment: (comment) =>
    set((state) => ({ comments: [...state.comments, comment] })),
  updateStoreComment: (commentId, newText) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, text: newText }
          : comment
      ),
    })),
  deleteStoreComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter(
        (comment) => comment.commentId !== commentId
      ),
    })),
}));
