import { asyncHandler } from "../util/asyncHandler.js"

export const getDashboardData = asyncHandler(async (req, res, next) => {
    res.status(200).json({ status: 'success', message: "Admin data fetched successfully.", data: { user: req.user } })
})