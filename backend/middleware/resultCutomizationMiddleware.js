const resultCustomizationMiddleware =
  (model, populate, populate2) => async (req, res, next) => {
    let query;

    // Copy of req.query
    let reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Searching DB
    query = model.find(reqQuery);

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    if (populate) {
      query = query.populate(populate);
    }

    if (populate2) {
      query = query.populate(populate2);
    }

    query = query.skip(startIndex).limit(limit);

    // Execute Query
    const results = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        // limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        // limit,
      };
    }

    res.resultCustomizationMiddleware = {
      success: true,
      count: results.length,
      pagination,
      pageLimit: limit,
      data: results,
    };

    next();
  };

module.exports = resultCustomizationMiddleware;
