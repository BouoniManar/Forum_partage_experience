const { Builder, By, until } = require('selenium-webdriver');

(async function testPage() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Charger la page
        await driver.get('http://localhost:3000/categories/1');

        // Attente pour s'assurer que la page est complètement chargée
        await driver.sleep(5000);

        // Recherche avec un XPath (au cas où le CSS échouerait)
        const addButton = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(@class, 'fa-plus-circle')]")),
            10000 // Timeout : 10 secondes
        );

        await driver.wait(until.elementIsVisible(addButton), 5000);

        console.log('Bouton trouvé, clic en cours...');
        await addButton.click();
        console.log('Clic réussi !');

        // Attendre que l'action ait pris effet (par exemple, qu'un nouvel élément apparaisse)
        await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Mon sujet test')]")),
            10000 // Timeout : 10 secondes
        );

        console.log('Ajout vérifié avec succès.');

        // Obtenir les métriques de performance via l'API `window.performance`
        const performanceMetrics = await driver.executeScript(() => {
            const navigationEntry = window.performance.getEntriesByType('navigation')[0];
            const resourceEntries = window.performance.getEntriesByType('resource');

            return {
                navigation: {
                    startTime: navigationEntry.startTime,
                    loadEventEnd: navigationEntry.loadEventEnd,
                    domContentLoaded: navigationEntry.domContentLoadedEventEnd,
                    duration: navigationEntry.duration,
                },
                resources: resourceEntries.map(resource => ({
                    name: resource.name,
                    startTime: resource.startTime,
                    duration: resource.duration,
                    transferSize: resource.transferSize,
                })),
            };
        });

        // Afficher les métriques dans la console
        console.log('Métriques de navigation :', performanceMetrics.navigation);
        console.log('Ressources chargées :', performanceMetrics.resources);
    } catch (error) {
        console.error('Erreur lors de l\'exécution :', error);
    } finally {
        await driver.quit();
    }
})();
