export const userReview = async(payload: {review: string;}) => {
    const {review} = payload;
    if (!review) return { success: false, message: "Invalid data" };
}