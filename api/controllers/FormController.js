'use strict'

const Controller = require('trails/controller')
const Errors = require('proxy-engine-errors')

/**
 * @module FormController
 * @description Generated Trails.js Controller.
 */
module.exports = class FormController extends Controller {
  generalStats(req, res) {
    res.json({})
  }
  /**
   *
   * @param req
   * @param res
   */
  count(req, res){
    const ProxyEngineService = this.app.services.ProxyEngineService
    ProxyEngineService.count('Form')
      .then(count => {
        const counts = {
          forms: count
        }
        return res.json(counts)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   *
   * @param req
   * @param res
   */
  search(req, res) {
    const orm = this.app.orm
    const Form = orm['Form']
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0
    const sort = req.query.sort || 'last_name DESC'
    const term = req.query.term
    console.log('FormController.search', term)
    Form.findAndCount({
      where: {
        $or: [
          {
            name: {
              $like: `%${term}%`
            }
          }
        ]
      },
      order: sort,
      offset: offset,
      req: req,
      limit: limit
    })
      .then(forms => {
        res.set('X-Pagination-Total', forms.count)
        res.set('X-Pagination-Pages', Math.ceil(forms.count / limit))
        res.set('X-Pagination-Page', offset == 0 ? 1 : Math.round(offset / limit))
        res.set('X-Pagination-Offset', offset)
        res.set('X-Pagination-Limit', limit)
        res.set('X-Pagination-Sort', sort)
        return res.json(forms.rows)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   *
   * @param req
   * @param res
   */
  findById(req, res){
    const orm = this.app.orm
    const Form = orm['Form']
    let id = req.params.id
    if (!id && req.form) {
      id = req.form.id
    }
    Form.findByIdDefault(id, {})
      .then(form => {
        if (!form) {
          throw new Errors.FoundError(Error(`Form id ${id} not found`))
        }
        return res.json(form)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   *
   * @param req
   * @param res
   */
  findAll(req, res){
    const orm = this.app.orm
    const Form = orm['Form']
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0
    const sort = req.query.sort || 'created_at DESC'
    const where = this.app.services.ProxyCartService.jsonCritera(req.query.where)

    Form.findAndCount({
      order: sort,
      offset: offset,
      limit: limit,
      where: where
    })
      .then(forms => {
        res.set('X-Pagination-Total', forms.count)
        res.set('X-Pagination-Pages', Math.ceil(forms.count / limit))
        res.set('X-Pagination-Page', offset == 0 ? 1 : Math.round(offset / limit))
        res.set('X-Pagination-Limit', limit)
        res.set('X-Pagination-Sort', sort)
        return res.json(forms.rows)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  create (req, res) {
    //
  }
  update (req, res) {
    //
  }
  destroy (req, res) {

  }
}

