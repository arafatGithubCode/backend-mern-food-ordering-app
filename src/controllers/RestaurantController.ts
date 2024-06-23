import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegExp = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegExp },
        { cuisines: { $in: [searchRegExp] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // searchOption = lastUpdated
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { searchRestaurant };
