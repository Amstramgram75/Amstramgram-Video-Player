@echo off
setlocal enableextensions
setlocal enableDelayedExpansion
REM on s'assure que le script est lancé en mode administrateur
fsutil dirty query %systemdrive% >nul
IF %ERRORLEVEL% NEQ 0 (
    echo ****************************************
	echo *                                      *
	echo *  Lance moi en mode administrateur ^^!  *
	echo *           Tete de noeud ^^!            *
	echo *                                      *
    echo ****************************************
	PAUSE
	exit
)
popd
@cd /d "%~dp0"
REM enregistrement du chemin complet
set directory=%~dp0
REM remplacement antislash par slash
set directory=%directory:\=/%
REM enregistrement du nom du projet Visual Code
for %%F in (.) do set "projectName=%%~nxF"
for /f "tokens=2" %%a in ("%projectName%") do (
    echo *******************************************
	echo *                                         *
	echo *  Pas d'espace dans le nom de dossier ^^!  *
	echo *           Tete de noeud ^^!               *
	echo *                                         *
    echo *******************************************
	PAUSE
	exit
)
REM Mise à jour du nom de projet dans package.json
set projectNameToLower=%projectName%
call :toLower projectNameToLower
fart.exe -q "package.json" lenom %projectNameToLower%
fart.exe -q "dist\\package.json" lenom %projectNameToLower%
fart.exe -q "dist\\package.json" leNom %projectName%
del fart.exe 2>nul
set projectPath=%directory%%projectName%.code-workspace
REM Création du projet Visual Code
if not exist %projectPath% (
	(
		echo ^{
		echo 	"folders": [
		echo 		^{
		echo 			"path": "."
		echo 		^}
		echo 	],
		echo 	"settings": ^{^}
		echo ^}
	) >> %projectPath%
)
REM Création du fichier runAll.bat
(
	echo start "" "C:\Users\Laurent\AppData\Local\Programs\Microsoft VS Code\Code.exe" %projectPath%
	echo start "" "cmd /k npm run dev"
) >> runAll.bat
REM Création du raccourci vers runAll.bat
(
	echo set oWS = WScript.CreateObject^("WScript.Shell"^)
	echo sLinkFile = "%projectName%.lnk"
	echo set oLink = oWS.createShortcut^(sLinkFile^)
	echo oLink.TargetPath = "cmd"
	echo oLink.Arguments = "/c %directory%runAll.bat"
	echo oLink.WorkingDirectory = "%directory%"
	echo oLink.IconLocation = "%directory%assets/ico/favicon.ico"
	echo oLink.Save
) >> createShortcut.vbs
cscript createShortcut.vbs
del createShortcut.vbs
cls
echo ******************************************************
echo *                                                    *
echo * Installation WEBPACK + WEBPACK-CLI + WEBPACK-MERGE *
echo *                                                    *
echo ******************************************************
call npm i -D webpack webpack-command webpack-merge
cls
echo ******************************************
echo *                                        *
echo * Installation BABEL-LOADER et COMPAGNIE *
echo *                                        *
echo ******************************************
call npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-syntax-dynamic-import
cls
echo **********************************************************************
echo *                                                                    *
echo * Installation MINI-CSS-EXTRACT-PLUGIN + CSS-LOADER + POSTCSS-LOADER *
echo *                                                                    *
echo **********************************************************************
call npm i -D mini-css-extract-plugin css-loader postcss-loader cssnano autoprefixer
cls
echo *******************************************************************
echo *                                                                 *
echo * Installation SASS-LOADER + NODE-SASS + FILE-LOADER + URL-LOADER *
echo *                                                                 *
echo *******************************************************************
call npm i -D sass-loader node-sass file-loader url-loader
cls
echo ************************************
echo *                                  *
echo * Installation ROLLUP et COMPAGNIE *
echo *                                  *
echo ************************************
call npm i -D rollup  rollup-plugin-babel rollup-plugin-terser rollup-plugin-postcss rollup-plugin-sass rollup-plugin-copy rollup-plugin-ignore-import
echo *************************
echo *                       *
echo *    TOUT EST OK !!!    *
echo *                       *
echo *************************
REM lancement
runAll.bat
exit /b
:toLower
for %%a in ("A=a" "B=b" "C=c" "D=d" "E=e" "F=f" "G=g" "H=h" "I=i"
            "J=j" "K=k" "L=l" "M=m" "N=n" "O=o" "P=p" "Q=q" "R=r"
            "S=s" "T=t" "U=u" "V=v" "W=w" "X=x" "Y=y" "Z=z" "Ä=ä"
            "Ö=ö" "Ü=ü") do (
    call set %~1=%%%~1:%%~a%%
)
exit /b