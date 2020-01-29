export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e30d6a3e3ba019f373b1eba',
                  title: 'Sanity Studio',
                  name: 'gatsby-sanity-portfolio-studio-xnfhk7xz',
                  apiId: '5b4db275-9ce1-46a9-9aa7-e218428ae77d'
                },
                {
                  buildHookId: '5e30d6a3b956f658de627ca0',
                  title: 'Portfolio Website',
                  name: 'gatsby-sanity-portfolio-web-qa4bsznk',
                  apiId: '17a898d1-16f3-47e7-8779-f3cdb7d7ea11'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/sevimuelli/gatsby-sanity-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://gatsby-sanity-portfolio-web-qa4bsznk.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
