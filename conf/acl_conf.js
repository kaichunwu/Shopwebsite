module.exports = [{
    roles: 'user',
    allows: [
        {resources: ['/'], permissions: ['get','post']},
        {resources: ['/users'], permissions: ['get','post']},
        {resources: ['/users/.*'], permissions: ['get','post']},
    ]
},{
    roles: 'seller',
    allows: [
        {resources: ['/'], permissions: ['get','post']},
        {resources: ['/seller'], permissions: ['get','post']},
        {resources: ['/seller/.*'], permissions: ['get','post']},
    ]
},{
    roles: 'admin',
    allows: [
        {resources: ['/'], permissions: ['get','post']},
        {resources: ['/admin'], permissions: ['get','post','delete']},
        {resources: ['/admin/.*'], permissions: ['get','post','delete']},
    ]
},{
    roles: 'supervisor',
    allows: [
        {resources: ['/'], permissions: ['get','post']},
        {resources: ['/supervisor'], permissions: ['get','post','delete']},
        {resources: ['/supervisor/.*'], permissions: ['get','post','delete']},
    ]
}]
