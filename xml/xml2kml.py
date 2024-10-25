# 02020-KML.py
# # -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET

class Kml(object):
    def __init__(self):
        self.raiz = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        self.doc = ET.SubElement(self.raiz, 'Document')

    def addPlacemark(self, nombre, descripcion, long, lat, alt, modoAltitud):
        pm = ET.SubElement(self.doc, 'Placemark')
        ET.SubElement(pm, 'name').text = '\n' + nombre + '\n'
        ET.SubElement(pm, 'description').text = '\n' + descripcion + '\n'
        punto = ET.SubElement(pm, 'Point')
        ET.SubElement(punto, 'coordinates').text = '\n{},{},{}\n'.format(long, lat, alt)
        ET.SubElement(punto, 'altitudeMode').text = '\n' + modoAltitud + '\n'

    def addLineString(self, nombre, extrude, tesela, listaCoordenadas, modoAltitud, color, ancho):
        ET.SubElement(self.doc, 'name').text = '\n' + nombre + '\n'
        pm = ET.SubElement(self.doc, 'Placemark')
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls, 'extrude').text = '\n' + extrude + '\n'
        ET.SubElement(ls, 'tessellation').text = '\n' + tesela + '\n'
        ET.SubElement(ls, 'coordinates').text = '\n' + listaCoordenadas + '\n'
        ET.SubElement(ls, 'altitudeMode').text = '\n' + modoAltitud + '\n'

        estilo = ET.SubElement(pm, 'Style')
        linea = ET.SubElement(estilo, 'LineStyle')
        ET.SubElement(linea, 'color').text = '\n' + color + '\n'
        ET.SubElement(linea, 'width').text = '\n' + ancho + '\n'

    def escribir(self, nombreArchivoKML):
        """
        Escribe el archivo KML con declaración y codificación
        """
        arbol = ET.ElementTree(self.raiz)
        arbol.write(nombreArchivoKML, encoding='utf-8', xml_declaration=True)

def main():
    print(Kml.__doc__)

    nombreKML = "circuito.kml"
    nuevoKML = Kml()

    tree = ET.parse('SEW\\xml\\circuitoEsquema.xml')
    root = tree.getroot()

    # Define namespaces to handle xmlns
    namespaces = {'u': 'http://www.uniovi.es'}

    # Iterate through all 'puntos' and add them as placemarks
    coordinates_list = []
    point_number = 1
    for punto in root.findall('.//u:coordenadas/u:puntos/u:puntoFinal', namespaces):
        lat = punto.find('u:latitudPunto', namespaces).text
        lon = punto.find('u:longitudPunto', namespaces).text
        alt = punto.find('u:altitudPunto', namespaces).text

        # Add each point as a Placemark in the KML
        nuevoKML.addPlacemark(f'{point_number} {lat},{lon}', 'Las Vegas Track Point', lon, lat, alt, 'absolute')

        # Add each point to the coordinate string for the line
        coordinates_list.append(f'{lon},{lat},{alt}')
        point_number += 1
    coordinates_list.append(coordinates_list[0])
    coordinates_string = '\n'.join(coordinates_list)
    # Add the line connecting all points
    nuevoKML.addLineString("Las Vegas Track", "1", "1", coordinates_string, 'absolute', '#ff0000ff', "5")

    """Creación del archivo en formato KML"""
    nuevoKML.escribir(nombreKML)
    print("Creado el archivo: ", nombreKML)


if __name__ == "__main__":
    main()
