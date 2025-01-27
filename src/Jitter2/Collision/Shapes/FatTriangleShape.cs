/*
 * Copyright (c) Thorben Linneweber and others
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

using System;
using Jitter2.LinearMath;

namespace Jitter2.Collision.Shapes;

/// <summary>
/// 表示网格内的单个三角形。<br></br><br></br>
/// 三角形不是平面的，而是沿其负法线方向延伸。此延伸赋予三角形厚度，可通过 <see cref="Thickness"/> 参数控制。<br></br><br></br>
/// Represents a single triangle within a mesh. The triangle is not flat but extends
/// along its negative normal direction. This extension gives the triangle thickness,
/// which can be controlled by the <see cref="Thickness"/> parameter.
/// </summary>
public class FatTriangleShape : TriangleShape
{
    private Real thickness;

    /// <summary>
    /// 设置或获取三角形的厚度。
    /// Set or get the thickness of the triangle.
    /// </summary>
    /// <exception cref="ArgumentException">
    /// 厚度必须大于 0.01 长度单位。<br></br><br></br> 
    /// Thickness must be larger than 0.01 length units.
    /// </exception>
    public Real Thickness
    {
        get => thickness;
        set
        {
            const Real minimumThickness = (Real)0.01;

            if (value < minimumThickness)
            {
                throw new ArgumentException($"{nameof(Thickness)} must not be smaller than {minimumThickness}");
            }

            thickness = value;
        }
    }

    /// <summary>
    /// 初始化三角形类的新实例。<br></br><br></br>
    /// Initializes a new instance of the TriangleShape class.
    /// </summary>
    /// <param name="mesh">
    /// 该三角形所属的三角形网格。<br></br><br></br>
    /// The triangle mesh to which this triangle belongs.
    /// </param>
    /// <param name="index">
    /// 表示网格内三角形位置的索引。<br></br><br></br>
    /// The index representing the position of the triangle within the mesh.
    /// </param>
    /// <param name="thickness">厚度</param>
    public FatTriangleShape(TriangleMesh mesh, int index, Real thickness = (Real)0.2) : base(mesh, index)
    {
        this.thickness = thickness;
        UpdateWorldBoundingBox();
    }

    public override void CalculateBoundingBox(in JQuaternion orientation, in JVector position, out JBBox box)
    {
        ref var triangle = ref Mesh.Indices[Index];
        var a = Mesh.Vertices[triangle.IndexA];
        var b = Mesh.Vertices[triangle.IndexB];
        var c = Mesh.Vertices[triangle.IndexC];

        JVector.Transform(a, orientation, out a);
        JVector.Transform(b, orientation, out b);
        JVector.Transform(c, orientation, out c);
        JVector.Transform(triangle.Normal, orientation, out JVector delta);

        delta *= Thickness;

        box = JBBox.SmallBox;

        box.AddPoint(a);
        box.AddPoint(b);
        box.AddPoint(c);

        box.AddPoint(a - delta);
        box.AddPoint(b - delta);
        box.AddPoint(c - delta);

        box.Min += position;
        box.Max += position;
    }

    public override void SupportMap(in JVector direction, out JVector result)
    {
        ref var triangle = ref Mesh.Indices[Index];

        JVector a = Mesh.Vertices[triangle.IndexA];
        JVector b = Mesh.Vertices[triangle.IndexB];
        JVector c = Mesh.Vertices[triangle.IndexC];

        Real min = JVector.Dot(a, direction);
        Real dot = JVector.Dot(b, direction);

        result = a;

        if (dot > min)
        {
            min = dot;
            result = b;
        }

        dot = JVector.Dot(c, direction);

        if (dot > min)
        {
            result = c;
        }

        if (JVector.Dot(triangle.Normal, direction) < (Real)0.0)
            result -= triangle.Normal * Thickness;
    }
}