const companyService = require('./company.service');

function getOwnerUserId(req) {
  return req.headers['x-user-id'];
}

function ensureAuth(req, res) {
  const ownerUserId = getOwnerUserId(req);
  if (!ownerUserId) {
    res.status(401).json({ success: false, error: 'Missing x-user-id header' });
    return null;
  }

  return ownerUserId;
}

async function listEmployees(req, res) {
  try {
    const ownerUserId = ensureAuth(req, res);
    if (!ownerUserId) return;

    const result = await companyService.listEmployees({
      ownerUserId,
      page: req.query.page,
      limit: req.query.limit,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function addEmployee(req, res) {
  try {
    const ownerUserId = ensureAuth(req, res);
    if (!ownerUserId) return;

    const result = await companyService.addEmployee({
      ownerUserId,
      email: req.body.email,
      planCode: req.body.planCode,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function removeEmployee(req, res) {
  try {
    const ownerUserId = ensureAuth(req, res);
    if (!ownerUserId) return;

    const result = await companyService.removeEmployee({
      ownerUserId,
      employeeId: req.params.id,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
}

async function getStats(req, res) {
  try {
    const ownerUserId = ensureAuth(req, res);
    if (!ownerUserId) return;

    const result = await companyService.getStats({ ownerUserId });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = {
  listEmployees,
  addEmployee,
  removeEmployee,
  getStats,
};
